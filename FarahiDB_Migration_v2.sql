-- =============================================
-- فرحي - تحديث قاعدة البيانات (Migration v2)
-- شغّل هذا الملف بعد FarahiDB_Final.sql
-- =============================================

USE FarahiDB;
GO

-- ١. إضافة عمود رقم هاتف الخدمة
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='Services' AND COLUMN_NAME='Phone')
    ALTER TABLE Services ADD Phone NVARCHAR(20) NULL;
GO

-- ٢. إضافة عمود كود التحقق من الإيميل
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='Users' AND COLUMN_NAME='VerificationCode')
    ALTER TABLE Users ADD VerificationCode NVARCHAR(6) NULL;
GO
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='Users' AND COLUMN_NAME='VerificationCodeExpiry')
    ALTER TABLE Users ADD VerificationCodeExpiry DATETIME NULL;
GO

-- ٣. إضافة كود تحقق للخدمات (بدل موافقة المدير)
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='Services' AND COLUMN_NAME='VerificationCode')
    ALTER TABLE Services ADD VerificationCode NVARCHAR(6) NULL;
GO
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='Services' AND COLUMN_NAME='VerificationCodeExpiry')
    ALTER TABLE Services ADD VerificationCodeExpiry DATETIME NULL;
GO

-- ٤. حذف الخدمات التجريبية (المقدم هو اللي يضيف)
DELETE FROM ServiceAmenities WHERE ServiceID IN (SELECT ServiceID FROM Services);
DELETE FROM ServiceImages WHERE ServiceID IN (SELECT ServiceID FROM Services);
DELETE FROM Reviews WHERE ServiceID IN (SELECT ServiceID FROM Services);
DELETE FROM BookingDetails WHERE BookingID IN (SELECT BookingID FROM Bookings);
DELETE FROM Bookings WHERE ServiceID IN (SELECT ServiceID FROM Services);
DELETE FROM Favorites WHERE ServiceID IN (SELECT ServiceID FROM Services);
DELETE FROM ServiceAvailability WHERE ServiceID IN (SELECT ServiceID FROM Services);
DELETE FROM Services;
GO

-- ٥. تحديث أرقام المستخدمين التجريبيين
UPDATE Users SET Phone = N'01000000000' WHERE Email = N'admin@farahi.com' AND Phone IS NULL;
GO

PRINT N'✅ تم تحديث قاعدة البيانات بنجاح (Migration v2)';
GO
