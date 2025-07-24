"""
Village Accounting ERP System - Pydantic Schemas
================================================

This module contains Pydantic schemas for the Village Accounting ERP System.
These schemas provide data validation, serialization, and API documentation
for all accounting-related operations.

Author: Manus AI
Date: January 7, 2025
Version: 1.0
"""

from pydantic import BaseModel, Field, validator, root_validator
from typing import Optional, List, Dict, Any
from datetime import datetime
from decimal import Decimal
from enum import Enum
import uuid


# Enums for validation

class AccountType(str, Enum):
    """Account types following standard accounting principles"""
    ASSET = "ASSET"
    LIABILITY = "LIABILITY"
    EQUITY = "EQUITY"
    REVENUE = "REVENUE"
    EXPENSE = "EXPENSE"


class BalanceType(str, Enum):
    """Normal balance types for accounts"""
    DEBIT = "DEBIT"
    CREDIT = "CREDIT"


class JournalEntryStatus(str, Enum):
    """Journal entry status for workflow management"""
    DRAFT = "DRAFT"
    POSTED = "POSTED"
    REVERSED = "REVERSED"


class PeriodType(str, Enum):
    """Accounting period types"""
    MONTHLY = "MONTHLY"
    QUARTERLY = "QUARTERLY"
    ANNUAL = "ANNUAL"


class ReconciliationStatus(str, Enum):
    """Bank reconciliation status"""
    MATCHED = "MATCHED"
    UNMATCHED = "UNMATCHED"
    DISPUTED = "DISPUTED"
    ADJUSTED = "ADJUSTED"


# Base schemas

class BaseSchema(BaseModel):
    """Base schema with common configuration"""
    
    class Config:
        orm_mode = True
        use_enum_values = True
        json_encoders = {
            datetime: lambda v: v.isoformat(),
            Decimal: lambda v: float(v),
            uuid.UUID: lambda v: str(v)
        }


# Chart of Accounts Schemas

class ChartOfAccountsBase(BaseSchema):
    """Base schema for Chart of Accounts"""
    account_code: str = Field(..., min_length=7, max_length=10, description="Account code (e.g., 1111-00)")
    account_name: str = Field(..., min_length=1, max_length=255, description="Account name in Thai")
    account_name_en: Optional[str] = Field(None, max_length=255, description="Account name in English")
    account_type: AccountType = Field(..., description="Account type classification")
    balance_type: BalanceType = Field(..., description="Normal balance type")
    parent_account_id: Optional[uuid.UUID] = Field(None, description="Parent account for hierarchy")
    level: int = Field(1, ge=1, le=5, description="Account hierarchy level")
    is_active: bool = Field(True, description="Whether account is active")
    is_system_account: bool = Field(False, description="Whether account is system-managed")
    allow_manual_entry: bool = Field(True, description="Whether manual entries are allowed")
    
    @validator('account_code')
    def validate_account_code(cls, v):
        """Validate account code format (XXXX-XX)"""
        if not v or len(v) < 7:
            raise ValueError('Account code must be at least 7 characters')
        
        parts = v.split('-')
        if len(parts) != 2:
            raise ValueError('Account code must be in format XXXX-XX')
        
        if not parts[0].isdigit() or not parts[1].isdigit():
            raise ValueError('Account code must contain only digits and hyphen')
        
        if len(parts[0]) != 4 or len(parts[1]) != 2:
            raise ValueError('Account code must be in format XXXX-XX')
        
        return v
    
    @validator('balance_type')
    def validate_balance_type_consistency(cls, v, values):
        """Validate balance type consistency with account type"""
        if 'account_type' in values:
            account_type = values['account_type']
            
            # Assets and Expenses normally have debit balances
            if account_type in [AccountType.ASSET, AccountType.EXPENSE] and v != BalanceType.DEBIT:
                raise ValueError(f'{account_type} accounts should normally have DEBIT balance')
            
            # Liabilities, Equity, and Revenue normally have credit balances
            if account_type in [AccountType.LIABILITY, AccountType.EQUITY, AccountType.REVENUE] and v != BalanceType.CREDIT:
                raise ValueError(f'{account_type} accounts should normally have CREDIT balance')
        
        return v


class ChartOfAccountsCreate(ChartOfAccountsBase):
    """Schema for creating new accounts"""
    pass


class ChartOfAccountsUpdate(BaseSchema):
    """Schema for updating existing accounts"""
    account_name: Optional[str] = Field(None, min_length=1, max_length=255)
    account_name_en: Optional[str] = Field(None, max_length=255)
    is_active: Optional[bool] = None
    allow_manual_entry: Optional[bool] = None


class ChartOfAccountsResponse(ChartOfAccountsBase):
    """Schema for account responses"""
    id: uuid.UUID
    created_at: datetime
    updated_at: Optional[datetime]
    created_by: Optional[uuid.UUID]
    updated_by: Optional[uuid.UUID]
    
    # Computed fields
    current_balance: Optional[Decimal] = Field(None, description="Current account balance")
    has_sub_accounts: Optional[bool] = Field(None, description="Whether account has sub-accounts")


class ChartOfAccountsHierarchy(ChartOfAccountsResponse):
    """Schema for hierarchical account display"""
    sub_accounts: List['ChartOfAccountsHierarchy'] = Field(default_factory=list)


# Update forward reference
ChartOfAccountsHierarchy.update_forward_refs()


# Accounting Period Schemas

class AccountingPeriodBase(BaseSchema):
    """Base schema for Accounting Periods"""
    period_name: str = Field(..., min_length=1, max_length=50, description="Period name (e.g., 'Jan 2025')")
    period_type: PeriodType = Field(..., description="Period type")
    fiscal_year: int = Field(..., ge=2020, le=2100, description="Fiscal year")
    start_date: datetime = Field(..., description="Period start date")
    end_date: datetime = Field(..., description="Period end date")
    
    @validator('end_date')
    def validate_date_range(cls, v, values):
        """Validate that end_date is after start_date"""
        if 'start_date' in values and v <= values['start_date']:
            raise ValueError('End date must be after start date')
        return v


class AccountingPeriodCreate(AccountingPeriodBase):
    """Schema for creating new periods"""
    pass


class AccountingPeriodUpdate(BaseSchema):
    """Schema for updating existing periods"""
    period_name: Optional[str] = Field(None, min_length=1, max_length=50)
    end_date: Optional[datetime] = None


class AccountingPeriodResponse(AccountingPeriodBase):
    """Schema for period responses"""
    id: uuid.UUID
    is_closed: bool
    closed_at: Optional[datetime]
    closed_by: Optional[uuid.UUID]
    created_at: datetime
    updated_at: Optional[datetime]


class AccountingPeriodClose(BaseSchema):
    """Schema for closing periods"""
    confirm_close: bool = Field(..., description="Confirmation to close period")
    closing_notes: Optional[str] = Field(None, max_length=1000, description="Notes for period closing")


# Journal Entry Schemas

class JournalEntryLineBase(BaseSchema):
    """Base schema for Journal Entry Lines"""
    line_number: int = Field(..., ge=1, description="Line number within journal entry")
    account_id: uuid.UUID = Field(..., description="Account ID")
    debit_amount: Optional[Decimal] = Field(None, ge=0, decimal_places=2, description="Debit amount")
    credit_amount: Optional[Decimal] = Field(None, ge=0, decimal_places=2, description="Credit amount")
    line_description: Optional[str] = Field(None, max_length=1000, description="Line description")
    
    @root_validator
    def validate_debit_or_credit(cls, values):
        """Validate that exactly one of debit_amount or credit_amount is provided"""
        debit = values.get('debit_amount', 0) or 0
        credit = values.get('credit_amount', 0) or 0
        
        if debit > 0 and credit > 0:
            raise ValueError('Cannot have both debit and credit amounts')
        
        if debit == 0 and credit == 0:
            raise ValueError('Must have either debit or credit amount')
        
        return values


class JournalEntryLineCreate(JournalEntryLineBase):
    """Schema for creating journal entry lines"""
    pass


class JournalEntryLineResponse(JournalEntryLineBase):
    """Schema for journal entry line responses"""
    id: uuid.UUID
    journal_entry_id: uuid.UUID
    created_at: datetime
    
    # Related data
    account_code: Optional[str] = Field(None, description="Account code")
    account_name: Optional[str] = Field(None, description="Account name")


class JournalEntryBase(BaseSchema):
    """Base schema for Journal Entries"""
    transaction_date: datetime = Field(..., description="Transaction date")
    description: str = Field(..., min_length=1, max_length=1000, description="Entry description")
    reference_number: Optional[str] = Field(None, max_length=50, description="Reference number")
    reference_type: Optional[str] = Field(None, max_length=50, description="Reference type")
    reference_id: Optional[uuid.UUID] = Field(None, description="Reference ID")


class JournalEntryCreate(JournalEntryBase):
    """Schema for creating journal entries"""
    lines: List[JournalEntryLineCreate] = Field(..., min_items=2, description="Journal entry lines")
    
    @validator('lines')
    def validate_balanced_entry(cls, v):
        """Validate that debits equal credits"""
        total_debits = sum((line.debit_amount or 0) for line in v)
        total_credits = sum((line.credit_amount or 0) for line in v)
        
        if total_debits != total_credits:
            raise ValueError(f'Debits ({total_debits}) must equal credits ({total_credits})')
        
        if total_debits == 0:
            raise ValueError('Entry must have non-zero amounts')
        
        return v
    
    @validator('lines')
    def validate_unique_line_numbers(cls, v):
        """Validate that line numbers are unique"""
        line_numbers = [line.line_number for line in v]
        if len(line_numbers) != len(set(line_numbers)):
            raise ValueError('Line numbers must be unique')
        
        return v


class JournalEntryUpdate(BaseSchema):
    """Schema for updating journal entries (only draft entries)"""
    description: Optional[str] = Field(None, min_length=1, max_length=1000)
    reference_number: Optional[str] = Field(None, max_length=50)
    lines: Optional[List[JournalEntryLineCreate]] = Field(None, min_items=2)
    
    @validator('lines')
    def validate_balanced_entry(cls, v):
        """Validate that debits equal credits if lines are provided"""
        if v is not None:
            total_debits = sum((line.debit_amount or 0) for line in v)
            total_credits = sum((line.credit_amount or 0) for line in v)
            
            if total_debits != total_credits:
                raise ValueError(f'Debits ({total_debits}) must equal credits ({total_credits})')
        
        return v


class JournalEntryResponse(JournalEntryBase):
    """Schema for journal entry responses"""
    id: uuid.UUID
    entry_number: str
    total_debit: Decimal
    total_credit: Decimal
    status: JournalEntryStatus
    posted_at: Optional[datetime]
    posted_by: Optional[uuid.UUID]
    period_id: uuid.UUID
    created_at: datetime
    updated_at: Optional[datetime]
    created_by: Optional[uuid.UUID]
    updated_by: Optional[uuid.UUID]
    
    # Related data
    lines: List[JournalEntryLineResponse] = Field(default_factory=list)
    period_name: Optional[str] = Field(None, description="Period name")


class JournalEntryPost(BaseSchema):
    """Schema for posting journal entries"""
    confirm_post: bool = Field(..., description="Confirmation to post entry")
    posting_notes: Optional[str] = Field(None, max_length=1000, description="Notes for posting")


class JournalEntryReverse(BaseSchema):
    """Schema for reversing journal entries"""
    reversal_reason: str = Field(..., min_length=1, max_length=1000, description="Reason for reversal")
    reversal_date: datetime = Field(..., description="Reversal date")


# General Ledger Schemas

class GeneralLedgerBase(BaseSchema):
    """Base schema for General Ledger"""
    account_id: uuid.UUID = Field(..., description="Account ID")
    period_id: uuid.UUID = Field(..., description="Period ID")
    beginning_balance: Decimal = Field(0, decimal_places=2, description="Beginning balance")
    ending_balance: Decimal = Field(0, decimal_places=2, description="Ending balance")
    debit_total: Decimal = Field(0, ge=0, decimal_places=2, description="Total debits")
    credit_total: Decimal = Field(0, ge=0, decimal_places=2, description="Total credits")


class GeneralLedgerResponse(GeneralLedgerBase):
    """Schema for general ledger responses"""
    id: uuid.UUID
    created_at: datetime
    updated_at: Optional[datetime]
    
    # Related data
    account_code: Optional[str] = Field(None, description="Account code")
    account_name: Optional[str] = Field(None, description="Account name")
    period_name: Optional[str] = Field(None, description="Period name")


class GeneralLedgerSummary(BaseSchema):
    """Schema for general ledger summary"""
    account_id: uuid.UUID
    account_code: str
    account_name: str
    account_type: AccountType
    current_balance: Decimal
    ytd_debits: Decimal
    ytd_credits: Decimal


# Integration Bridge Schemas

class PaymentJournalEntryBase(BaseSchema):
    """Base schema for Payment Journal Entry bridge"""
    payment_id: uuid.UUID = Field(..., description="Payment ID")
    journal_entry_id: uuid.UUID = Field(..., description="Journal Entry ID")


class PaymentJournalEntryResponse(PaymentJournalEntryBase):
    """Schema for payment journal entry responses"""
    id: uuid.UUID
    created_at: datetime
    created_by: Optional[uuid.UUID]


class SpendingJournalEntryBase(BaseSchema):
    """Base schema for Spending Journal Entry bridge"""
    spending_record_id: uuid.UUID = Field(..., description="Spending Record ID")
    journal_entry_id: uuid.UUID = Field(..., description="Journal Entry ID")


class SpendingJournalEntryResponse(SpendingJournalEntryBase):
    """Schema for spending journal entry responses"""
    id: uuid.UUID
    created_at: datetime
    created_by: Optional[uuid.UUID]


# Bank Reconciliation Schemas

class BankReconciliationGLBase(BaseSchema):
    """Base schema for Bank Reconciliation GL bridge"""
    bank_reconciliation_id: uuid.UUID = Field(..., description="Bank Reconciliation ID")
    gl_account_id: uuid.UUID = Field(..., description="GL Account ID")
    journal_entry_id: Optional[uuid.UUID] = Field(None, description="Journal Entry ID")
    reconciled_amount: Decimal = Field(..., decimal_places=2, description="Reconciled amount")
    reconciliation_date: datetime = Field(..., description="Reconciliation date")
    reconciliation_status: ReconciliationStatus = Field(ReconciliationStatus.MATCHED, description="Reconciliation status")


class BankReconciliationGLResponse(BankReconciliationGLBase):
    """Schema for bank reconciliation GL responses"""
    id: uuid.UUID
    created_at: datetime
    reconciled_by: Optional[uuid.UUID]
    
    # Related data
    account_code: Optional[str] = Field(None, description="Account code")
    account_name: Optional[str] = Field(None, description="Account name")


# Financial Report Schemas

class TrialBalanceItem(BaseSchema):
    """Schema for trial balance line items"""
    account_code: str
    account_name: str
    account_type: AccountType
    debit_balance: Optional[Decimal] = None
    credit_balance: Optional[Decimal] = None


class TrialBalanceReport(BaseSchema):
    """Schema for trial balance report"""
    period_id: uuid.UUID
    period_name: str
    as_of_date: datetime
    items: List[TrialBalanceItem]
    total_debits: Decimal
    total_credits: Decimal
    is_balanced: bool


class IncomeStatementItem(BaseSchema):
    """Schema for income statement line items"""
    account_code: str
    account_name: str
    current_period: Decimal
    prior_period: Optional[Decimal] = None
    variance: Optional[Decimal] = None
    variance_percent: Optional[Decimal] = None


class IncomeStatementReport(BaseSchema):
    """Schema for income statement report"""
    period_id: uuid.UUID
    period_name: str
    revenue_items: List[IncomeStatementItem]
    expense_items: List[IncomeStatementItem]
    total_revenue: Decimal
    total_expenses: Decimal
    net_income: Decimal


class BalanceSheetItem(BaseSchema):
    """Schema for balance sheet line items"""
    account_code: str
    account_name: str
    current_balance: Decimal
    prior_balance: Optional[Decimal] = None


class BalanceSheetReport(BaseSchema):
    """Schema for balance sheet report"""
    as_of_date: datetime
    asset_items: List[BalanceSheetItem]
    liability_items: List[BalanceSheetItem]
    equity_items: List[BalanceSheetItem]
    total_assets: Decimal
    total_liabilities: Decimal
    total_equity: Decimal
    is_balanced: bool


# API Response Schemas

class APIResponse(BaseSchema):
    """Generic API response schema"""
    success: bool = True
    message: str = "Operation completed successfully"
    data: Optional[Any] = None
    errors: Optional[List[str]] = None


class PaginatedResponse(BaseSchema):
    """Paginated response schema"""
    items: List[Any]
    total: int
    page: int
    size: int
    pages: int


# Validation Schemas

class AccountCodeValidation(BaseSchema):
    """Schema for account code validation"""
    account_code: str
    is_valid: bool
    errors: List[str] = Field(default_factory=list)


class JournalEntryValidation(BaseSchema):
    """Schema for journal entry validation"""
    is_valid: bool
    is_balanced: bool
    total_debits: Decimal
    total_credits: Decimal
    errors: List[str] = Field(default_factory=list)
    warnings: List[str] = Field(default_factory=list)

