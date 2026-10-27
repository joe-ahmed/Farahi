-- =============================================
-- فرحي - منصة حجز خدمات الأفراح
-- سكريبت قاعدة البيانات الكامل
-- =============================================

USE master;
GO

-- إنشاء قاعدة البيانات لو مش موجودة (بدون حذف أي بيانات)
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'FarahiDB')
    CREATE DATABASE FarahiDB COLLATE Arabic_CI_AS;
GO

USE FarahiDB;
GO

-- =============================================
-- ١. المستخدمين
-- =============================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users' AND xtype='U')
CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(256) NOT NULL UNIQUE,
    Phone NVARCHAR(20),
    PasswordHash NVARCHAR(512) NOT NULL,
    Role NVARCHAR(20) NOT NULL CHECK (Role IN ('Customer', 'Provider', 'Admin')),
    IsEmailVerified BIT NOT NULL DEFAULT 0,
    IsActive BIT NOT NULL DEFAULT 1,
    ProfileImageUrl NVARCHAR(500),
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME NOT NULL DEFAULT GETDATE()
);
GO

-- =============================================
-- ٢. رموز التحديث (JWT Refresh Tokens)
-- =============================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='RefreshTokens' AND xtype='U')
CREATE TABLE RefreshTokens (
    TokenID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    Token NVARCHAR(512) NOT NULL,
    ExpiresAt DATETIME NOT NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    RevokedAt DATETIME,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO

-- =============================================
-- ٣. فئات الخدمات
-- =============================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ServiceCategories' AND xtype='U')
CREATE TABLE ServiceCategories (
    CategoryID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL UNIQUE,
    NameAr NVARCHAR(100),
    Description NVARCHAR(500),
    DescriptionAr NVARCHAR(500),
    IconUrl NVARCHAR(500),
    DisplayOrder INT NOT NULL DEFAULT 0,
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE()
);
GO

-- =============================================
-- ٤. المميزات
-- =============================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Amenities' AND xtype='U')
CREATE TABLE Amenities (
    AmenityID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL UNIQUE,
    NameAr NVARCHAR(100),
    IconUrl NVARCHAR(500)
);
GO

-- =============================================
-- ٥. الخدمات
-- =============================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Services' AND xtype='U')
CREATE TABLE Services (
    ServiceID INT IDENTITY(1,1) PRIMARY KEY,
    ProviderID INT NOT NULL,
    CategoryID INT NOT NULL,
    Name NVARCHAR(200) NOT NULL,
    NameAr NVARCHAR(200),
    Description NVARCHAR(4000),
    DescriptionAr NVARCHAR(4000),
    City NVARCHAR(100) NOT NULL,
    Address NVARCHAR(500),
    Latitude DECIMAL(9,6),
    Longitude DECIMAL(9,6),
    Price DECIMAL(18,2) NOT NULL CHECK (Price >= 0),
    Capacity INT CHECK (Capacity > 0 OR Capacity IS NULL),
    AverageRating DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    ReviewCount INT NOT NULL DEFAULT 0,
    IsApproved BIT NOT NULL DEFAULT 0,
    ApprovedByAdminID INT,
    ApprovedAt DATETIME,
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (ProviderID) REFERENCES Users(UserID),
    FOREIGN KEY (CategoryID) REFERENCES ServiceCategories(CategoryID),
    FOREIGN KEY (ApprovedByAdminID) REFERENCES Users(UserID)
);
GO

-- =============================================
-- ٦. صور الخدمات
-- =============================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ServiceImages' AND xtype='U')
CREATE TABLE ServiceImages (
    ImageID INT IDENTITY(1,1) PRIMARY KEY,
    ServiceID INT NOT NULL,
    ImageUrl NVARCHAR(500) NOT NULL,
    DisplayOrder INT NOT NULL DEFAULT 0,
    AltText NVARCHAR(200),
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (ServiceID) REFERENCES Services(ServiceID)
);
GO

-- =============================================
-- ٧. ربط الخدمات بالمميزات
-- =============================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ServiceAmenities' AND xtype='U')
CREATE TABLE ServiceAmenities (
    ServiceID INT NOT NULL,
    AmenityID INT NOT NULL,
    PRIMARY KEY (ServiceID, AmenityID),
    FOREIGN KEY (ServiceID) REFERENCES Services(ServiceID),
    FOREIGN KEY (AmenityID) REFERENCES Amenities(AmenityID)
);
GO

-- =============================================
-- ٨. إتاحة الخدمات
-- =============================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ServiceAvailability' AND xtype='U')
CREATE TABLE ServiceAvailability (
    AvailabilityID INT IDENTITY(1,1) PRIMARY KEY,
    ServiceID INT NOT NULL,
    AvailDate DATE NOT NULL,
    IsAvailable BIT NOT NULL DEFAULT 1,
    Notes NVARCHAR(500),
    FOREIGN KEY (ServiceID) REFERENCES Services(ServiceID),
    CONSTRAINT UQ_Service_Date UNIQUE (ServiceID, AvailDate)
);
GO

-- =============================================
-- ٩. الحجوزات
-- =============================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Bookings' AND xtype='U')
CREATE TABLE Bookings (
    BookingID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    ServiceID INT NOT NULL,
    EventDate DATE NOT NULL,
    BookingDate DATETIME NOT NULL DEFAULT GETDATE(),
    Status NVARCHAR(20) NOT NULL DEFAULT 'Pending'
        CHECK (Status IN ('Pending', 'Confirmed', 'Cancelled', 'Completed')),
    TotalPrice DECIMAL(18,2) NOT NULL CHECK (TotalPrice >= 0),
    Notes NVARCHAR(2000),
    ConfirmedAt DATETIME,
    CompletedAt DATETIME,
    CancelledAt DATETIME,
    CancelReason NVARCHAR(500),
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ServiceID) REFERENCES Services(ServiceID)
);
GO

-- =============================================
-- ١٠. تفاصيل الحجز
-- =============================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='BookingDetails' AND xtype='U')
CREATE TABLE BookingDetails (
    DetailID INT IDENTITY(1,1) PRIMARY KEY,
    BookingID INT NOT NULL,
    ServiceID INT NOT NULL,
    Price DECIMAL(18,2) NOT NULL,
    Notes NVARCHAR(500),
    FOREIGN KEY (BookingID) REFERENCES Bookings(BookingID),
    FOREIGN KEY (ServiceID) REFERENCES Services(ServiceID)
);
GO

-- =============================================
-- ١١. التقييمات
-- =============================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Reviews' AND xtype='U')
CREATE TABLE Reviews (
    ReviewID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    ServiceID INT NOT NULL,
    BookingID INT NOT NULL UNIQUE,
    Rating INT NOT NULL CHECK (Rating BETWEEN 1 AND 5),
    Comment NVARCHAR(2000),
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ServiceID) REFERENCES Services(ServiceID),
    FOREIGN KEY (BookingID) REFERENCES Bookings(BookingID)
);
GO

-- =============================================
-- ١٢. الإشعارات
-- =============================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Notifications' AND xtype='U')
CREATE TABLE Notifications (
    NotificationID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    Title NVARCHAR(200) NOT NULL,
    Message NVARCHAR(1000) NOT NULL,
    Type NVARCHAR(50) NOT NULL
        CHECK (Type IN ('BookingCreated', 'BookingConfirmed', 'BookingCancelled',
                        'BookingCompleted', 'ReviewReceived', 'ServiceApproved',
                        'ServiceRejected', 'General')),
    ReferenceID INT,
    IsRead BIT NOT NULL DEFAULT 0,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO

-- =============================================
-- ١٣. بلاغات الأخطاء
-- =============================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='BugReports' AND xtype='U')
CREATE TABLE BugReports (
    ReportID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(4000) NOT NULL,
    Status NVARCHAR(20) NOT NULL DEFAULT 'Open'
        CHECK (Status IN ('Open', 'InProgress', 'Resolved', 'Closed')),
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    ResolvedAt DATETIME,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO

-- =============================================
-- ١٤. المفضلة
-- =============================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Favorites' AND xtype='U')
CREATE TABLE Favorites (
    UserID INT NOT NULL,
    ServiceID INT NOT NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    PRIMARY KEY (UserID, ServiceID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ServiceID) REFERENCES Services(ServiceID)
);
GO

-- =============================================
-- ١٥. سجل العمليات
-- =============================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='AuditLog' AND xtype='U')
CREATE TABLE AuditLog (
    LogID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT,
    EntityType NVARCHAR(50) NOT NULL,
    EntityID INT NOT NULL,
    Action NVARCHAR(50) NOT NULL,
    Details NVARCHAR(MAX),
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE()
);
GO

-- =============================================
-- ١٦. إعدادات النظام
-- =============================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='SystemSettings' AND xtype='U')
CREATE TABLE SystemSettings (
    SettingKey NVARCHAR(100) PRIMARY KEY,
    SettingValue NVARCHAR(1000) NOT NULL,
    Description NVARCHAR(500),
    UpdatedAt DATETIME NOT NULL DEFAULT GETDATE()
);
GO


-- =============================================
-- الفهارس
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name='IX_Users_Email')
    CREATE NONCLUSTERED INDEX IX_Users_Email ON Users(Email) WHERE IsActive = 1;
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name='IX_Services_Browse')
    CREATE NONCLUSTERED INDEX IX_Services_Browse ON Services(CategoryID, City) WHERE IsActive = 1 AND IsApproved = 1;
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name='IX_Services_Provider')
    CREATE NONCLUSTERED INDEX IX_Services_Provider ON Services(ProviderID) WHERE IsActive = 1;
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name='IX_Bookings_User')
    CREATE NONCLUSTERED INDEX IX_Bookings_User ON Bookings(UserID, EventDate DESC);
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name='IX_Bookings_Service')
    CREATE NONCLUSTERED INDEX IX_Bookings_Service ON Bookings(ServiceID, EventDate) WHERE Status IN ('Pending', 'Confirmed');
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name='IX_Reviews_Service')
    CREATE NONCLUSTERED INDEX IX_Reviews_Service ON Reviews(ServiceID, CreatedAt DESC);
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name='IX_Notifications_Unread')
    CREATE NONCLUSTERED INDEX IX_Notifications_Unread ON Notifications(UserID, CreatedAt DESC) WHERE IsRead = 0;
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name='IX_Availability')
    CREATE NONCLUSTERED INDEX IX_Availability ON ServiceAvailability(ServiceID, AvailDate);
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name='IX_RefreshTokens_Token')
    CREATE NONCLUSTERED INDEX IX_RefreshTokens_Token ON RefreshTokens(Token);
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name='IX_RefreshTokens_User')
    CREATE NONCLUSTERED INDEX IX_RefreshTokens_User ON RefreshTokens(UserID) WHERE RevokedAt IS NULL;
GO


-- =============================================
-- البيانات التجريبية
-- =============================================
-- كل INSERT محمي بـ IF NOT EXISTS — تقدر تشغل السكريبت ١٠٠ مرة بدون أخطاء
-- البيانات الموجودة مش هتتمسح أبداً

-- ===================== المستخدمين =====================
-- admin@farahi.com      → Admin@123
-- ahmed@example.com     → Ahmed@123
-- fatma@example.com     → Fatma@123
-- omar@example.com      → Omar@123
-- sara@example.com      → Sara@123
-- mahmoud@example.com   → Mahmoud@123
-- nour@example.com      → Nour@123

IF NOT EXISTS (SELECT 1 FROM Users WHERE Email = N'admin@farahi.com')
BEGIN
    SET IDENTITY_INSERT Users ON;
    INSERT INTO Users (UserID, FirstName, LastName, Email, Phone, PasswordHash, Role, IsEmailVerified, IsActive) VALUES
        (1, N'مدير',    N'النظام',   N'admin@farahi.com',    N'01000000000', N'$2b$11$N2JhD7oZBEI0nDS24ej3AeECS80ZUYmVKJehZPSZbf0/kv5a.5QPS', 'Admin',    1, 1),
        (2, N'أحمد',    N'محمد',     N'ahmed@example.com',   N'01012345678', N'$2b$11$UCGdwipQ.Tz7wbl3lCmgc.XrJ8AGLyBvnAkwNMPQdAKr1a0KMSX92', 'Provider', 1, 1),
        (3, N'فاطمة',   N'علي',      N'fatma@example.com',   N'01098765432', N'$2b$11$b8BuNgBZfD676/XuEQfgkuegaBMl6HSB7BZJnh1Sk1heBQsECVMV6', 'Provider', 1, 1),
        (4, N'عمر',     N'حسن',      N'omar@example.com',    N'01111111111', N'$2b$11$ruHpP4T326V6U/bibkzYletIAQowfX5uTdom3PMZ00/AgOkuuBYNq', 'Customer', 1, 1),
        (5, N'سارة',    N'إبراهيم',  N'sara@example.com',    N'01222222222', N'$2b$11$RhQECe4zyR4r2NLJtnUN8OW/eq/Z1b82djgqX3mHQ9VhPTy3hwqGi', 'Customer', 1, 1),
        (6, N'محمود',   N'أحمد',     N'mahmoud@example.com', N'01333333333', N'$2b$11$brcS1vep.3sftD1qmMb1wua5VQuY1KeozqxaSNJ/ZYRMOMMnTtC..', 'Customer', 1, 1),
        (7, N'نور',     N'السيد',    N'nour@example.com',    N'01555555555', N'$2b$11$y1r1qGI36l1s.3.8C3xwkuKNcYRKYtDW4zCsJpBkz9kOdFImxv7O6', 'Provider', 1, 1);
    SET IDENTITY_INSERT Users OFF;
END
GO

-- ===================== فئات الخدمات =====================
IF NOT EXISTS (SELECT 1 FROM ServiceCategories WHERE CategoryID = 1)
BEGIN
    SET IDENTITY_INSERT ServiceCategories ON;
    INSERT INTO ServiceCategories (CategoryID, Name, NameAr, Description, DescriptionAr, DisplayOrder) VALUES
        (1, N'Wedding Venues',            N'قاعات الأفراح',     N'Banquet halls, hotels, and outdoor spaces',    N'قاعات حفلات وفنادق ومساحات مفتوحة',    1),
        (2, N'Photography & Videography', N'التصوير والفيديو',  N'Professional wedding photography and video',   N'تصوير احترافي للأفراح وفيديو',          2),
        (3, N'Beauty & Makeup',           N'التجميل والمكياج',  N'Bridal makeup artists and beauty services',    N'فنانات مكياج العروس وخدمات التجميل',    3),
        (4, N'Catering',                  N'تقديم الطعام',      N'Food and beverage catering',                   N'خدمات الطعام والمشروبات للمناسبات',      4),
        (5, N'Decoration & Styling',      N'الديكور والتنسيق',  N'Event decoration, flowers, and styling',       N'ديكور المناسبات والزهور وتنسيق القاعات',5),
        (6, N'Music & Entertainment',     N'الموسيقى والترفيه', N'DJs, bands, and entertainment',                N'منسقو أغاني وفرق موسيقية وخدمات ترفيه', 6),
        (7, N'Transportation',            N'النقل والمواصلات',  N'Wedding cars and guest transportation',        N'سيارات الزفاف ونقل الضيوف',             7);
    SET IDENTITY_INSERT ServiceCategories OFF;
END
GO

-- ===================== المميزات =====================
IF NOT EXISTS (SELECT 1 FROM Amenities WHERE AmenityID = 1)
BEGIN
    SET IDENTITY_INSERT Amenities ON;
    INSERT INTO Amenities (AmenityID, Name, NameAr) VALUES
        (1,  N'Central AC',        N'تكييف مركزي'),
        (2,  N'Parking',           N'موقف سيارات'),
        (3,  N'Buffet Included',   N'بوفيه شامل'),
        (4,  N'Open Air',          N'هواء طلق'),
        (5,  N'Separate Halls',    N'قاعات منفصلة'),
        (6,  N'Free WiFi',         N'واي فاي مجاني'),
        (7,  N'Bridal Suite',      N'جناح العروس'),
        (8,  N'Valet Parking',     N'خدمة صف السيارات'),
        (9,  N'Sound System',      N'نظام صوتي'),
        (10, N'Stage & Lighting',  N'مسرح وإضاءة'),
        (11, N'Generator Backup',  N'مولد كهرباء احتياطي'),
        (12, N'Prayer Room',       N'مصلى');
    SET IDENTITY_INSERT Amenities OFF;
END
GO

-- ===================== الخدمات =====================
IF NOT EXISTS (SELECT 1 FROM Services WHERE ServiceID = 1)
BEGIN
    SET IDENTITY_INSERT Services ON;
    INSERT INTO Services (ServiceID, ProviderID, CategoryID, Name, NameAr, Description, DescriptionAr, City, Address, Price, Capacity, IsApproved, ApprovedByAdminID, ApprovedAt) VALUES
        (1, 2, 1, N'Royal Palace Hall', N'قاعة رويال بالاس',
         N'A luxurious wedding venue in the heart of Sohag.', N'قاعة أفراح فاخرة في قلب سوهاج.',
         N'Sohag', N'شارع الكورنيش، سوهاج', 15000.00, 500, 1, 1, GETDATE()),
        (2, 2, 1, N'Nile View Events', N'قاعة إطلالة النيل',
         N'Elegant riverside venue with panoramic views.', N'قاعة أنيقة على النيل بإطلالة بانورامية.',
         N'Sohag', N'كورنيش النيل، سوهاج', 8500.00, 300, 1, 1, GETDATE()),
        (3, 3, 2, N'Moments Studio', N'استوديو لحظات',
         N'Professional wedding photography and cinematic videography.', N'تصوير أفراح احترافي وفيديو سينمائي.',
         N'Sohag', N'شارع الجمهورية، سوهاج', 3500.00, NULL, 1, 1, GETDATE()),
        (4, 3, 3, N'Glamour Bridal Studio', N'استوديو جلامور للعرائس',
         N'Expert bridal makeup with premium products.', N'مكياج عرائس متخصص بمنتجات فاخرة.',
         N'Sohag', N'شارع التحرير، سوهاج', 2500.00, NULL, 1, 1, GETDATE()),
        (5, 7, 1, N'Al-Amal Royal Hall', N'قاعة الأمل الملكية',
         N'Premium event hall with central AC and private parking.', N'قاعة مناسبات فاخرة بتكييف مركزي وباركينج خاص.',
         N'Sohag', N'مدينة سوهاج', 5000.00, 400, 1, 1, GETDATE());
    SET IDENTITY_INSERT Services OFF;
END
GO

-- ===================== صور =====================
IF NOT EXISTS (SELECT 1 FROM ServiceImages WHERE ServiceID = 1)
BEGIN
    INSERT INTO ServiceImages (ServiceID, ImageUrl, DisplayOrder, AltText) VALUES
        (1, N'/images/services/royal-palace-1.jpg', 0, N'القاعة الرئيسية'),
        (1, N'/images/services/royal-palace-2.jpg', 1, N'البوفيه'),
        (2, N'/images/services/nile-view-1.jpg',    0, N'إطلالة النيل'),
        (3, N'/images/services/moments-1.jpg',      0, N'صور زفاف'),
        (4, N'/images/services/glamour-1.jpg',      0, N'مكياج العروسة'),
        (5, N'/images/services/al-amal-1.jpg',      0, N'القاعة الملكية');
END
GO

-- ===================== مميزات القاعات =====================
IF NOT EXISTS (SELECT 1 FROM ServiceAmenities WHERE ServiceID = 1 AND AmenityID = 1)
BEGIN
    INSERT INTO ServiceAmenities (ServiceID, AmenityID) VALUES
        (1, 1), (1, 2), (1, 3), (1, 9), (1, 10), (1, 11), (1, 12),
        (2, 1), (2, 2), (2, 4), (2, 6), (2, 8), (2, 9),
        (5, 1), (5, 2), (5, 3), (5, 5), (5, 9), (5, 10);
END
GO

-- ===================== حجوزات =====================
IF NOT EXISTS (SELECT 1 FROM Bookings WHERE BookingID = 1)
BEGIN
    SET IDENTITY_INSERT Bookings ON;
    INSERT INTO Bookings (BookingID, UserID, ServiceID, EventDate, Status, TotalPrice, ConfirmedAt, Notes) VALUES
        (1, 4, 1, DATEADD(DAY, 14, CAST(GETDATE() AS DATE)), 'Confirmed', 15000.00, GETDATE(), N'محتاجين كراسي إضافية'),
        (2, 5, 2, DATEADD(DAY, 21, CAST(GETDATE() AS DATE)), 'Pending',   8500.00,  NULL,      N'حفلة بعد الظهر'),
        (3, 4, 3, DATEADD(DAY, 14, CAST(GETDATE() AS DATE)), 'Confirmed', 3500.00,  GETDATE(), NULL),
        (4, 5, 4, DATEADD(DAY, -3, CAST(GETDATE() AS DATE)), 'Completed', 2500.00,  GETDATE(), NULL);
    SET IDENTITY_INSERT Bookings OFF;
END
GO

-- ===================== تقييم =====================
IF NOT EXISTS (SELECT 1 FROM Reviews WHERE BookingID = 4)
BEGIN
    INSERT INTO Reviews (UserID, ServiceID, BookingID, Rating, Comment) VALUES
        (5, 4, 4, 5, N'شغل ممتاز! المكياج كان رائع واستمر طول الليل.');
    UPDATE Services SET AverageRating = 5.00, ReviewCount = 1 WHERE ServiceID = 4;
END
GO

-- ===================== إعدادات =====================
IF NOT EXISTS (SELECT 1 FROM SystemSettings WHERE SettingKey = N'SiteName')
BEGIN
    INSERT INTO SystemSettings (SettingKey, SettingValue, Description) VALUES
        (N'SiteName',       N'فرحي',             N'اسم المنصة'),
        (N'DefaultCity',    N'Sohag',            N'المدينة الافتراضية'),
        (N'Currency',       N'EGP',              N'العملة'),
        (N'CurrencySymbol', N'ج.م',              N'رمز العملة');
END
GO

PRINT N'';
PRINT N'════════════════════════════════════════════════════';
PRINT N'  فرحي - تم إنشاء قاعدة البيانات بنجاح ✅';
PRINT N'════════════════════════════════════════════════════';
PRINT N'';
PRINT N'  حسابات تجريبية (إيميل → كلمة المرور):';
PRINT N'  admin@farahi.com      → Admin@123   (مدير)';
PRINT N'  ahmed@example.com     → Ahmed@123   (مقدم خدمة)';
PRINT N'  fatma@example.com     → Fatma@123   (مقدم خدمة)';
PRINT N'  omar@example.com      → Omar@123    (عميل)';
PRINT N'  sara@example.com      → Sara@123    (عميل)';
PRINT N'';
PRINT N'════════════════════════════════════════════════════';
GO
