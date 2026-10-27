-- =============================================
-- فرحي - تحديث قاعدة البيانات (Migration v3)
-- إضافة جدول المدفوعات
-- شغّل بعد Migration v2
-- =============================================

USE FarahiDB;
GO

-- جدول المدفوعات
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Payments' AND xtype='U')
CREATE TABLE Payments (
    PaymentID INT IDENTITY(1,1) PRIMARY KEY,
    BookingID INT NOT NULL UNIQUE,           -- حجز واحد = دفعة واحدة
    Amount DECIMAL(18,2) NOT NULL,
    Method NVARCHAR(20) NOT NULL             -- Cash, VodafoneCash, Card
        CHECK (Method IN ('Cash', 'VodafoneCash', 'Card')),
    Status NVARCHAR(20) NOT NULL DEFAULT 'Pending'
        CHECK (Status IN ('Pending', 'Paid', 'Failed', 'Refunded')),
    TransactionRef NVARCHAR(100),            -- رقم مرجعي (للمحافظ الإلكترونية أو الكارت)
    WalletPhone NVARCHAR(20),               -- رقم المحفظة (فودافون كاش)
    PaidAt DATETIME,
    Notes NVARCHAR(500),
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (BookingID) REFERENCES Bookings(BookingID)
);
GO

-- إضافة حقل طريقة الدفع في الحجوزات
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='Bookings' AND COLUMN_NAME='PaymentMethod')
    ALTER TABLE Bookings ADD PaymentMethod NVARCHAR(20) NULL;
GO

-- فهرس للبحث عن مدفوعات معلقة
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name='IX_Payments_Status')
    CREATE NONCLUSTERED INDEX IX_Payments_Status ON Payments(Status, BookingID);
GO

PRINT N'✅ تم إضافة جدول المدفوعات (Migration v3)';
GO
