# Admin Dashboard Setup & Quick Start Guide

## 🚀 Quick Start

### 1. Access Admin Dashboard
```
http://localhost:3000/admin-login
```

### 2. Login Credentials
You need an admin user in your database. Use these credentials:
```
Email: admin@example.com (or your admin email)
Password: your-admin-password
```

### 3. Dashboard URL
After login, you'll be redirected to:
```
http://localhost:3000/admin
```

## 📋 What You Can Do

### Blog Management (`/admin/blog`)
- ✅ Create new blog posts
- 📝 Edit existing posts
- 🗑️ Delete posts
- 🖼️ Upload cover images
- 📊 View all posts in a table

### Activities/Treks Management (`/admin/activities`)
- ✅ Create new treks with:
  - Full details (duration, difficulty, price)
  - Hero image
  - Multiple gallery photos
  - Day-by-day itinerary
- 📝 Edit trek information
- 🗑️ Delete treks
- 📸 Manage trek photos

## 🔐 Security

The admin system includes:
- ✅ NextAuth.js authentication
- ✅ Role-based access control
- ✅ Password hashing with bcryptjs
- ✅ Session management
- ✅ Server-side authorization checks

## 📁 New Files Created

```
src/
├── app/
│   ├── (auth)/
│   │   └── admin-login/
│   │       └── page.tsx              ← Admin login page
│   └── admin/
│       ├── layout.tsx                ← Updated with sidebar
│       ├── activities/
│       │   ├── page.tsx              ← Activities list
│       │   ├── new/
│       │   │   └── page.tsx          ← Create activity
│       │   └── [id]/
│       │       └── page.tsx          ← Edit activity
│       └── blog/
│           ├── page.tsx              ← Updated blog list
│           ├── new/
│           │   └── page.tsx          ← Updated create blog
│           └── [id]/
│               └── page.tsx          ← Updated edit blog
└── components/
    └── AdminSidebar.tsx              ← Navigation sidebar
```

## 🔧 Configuration

### NextAuth.js
The authentication is configured in:
- `src/lib/auth.ts` - Auth configuration
- `src/app/api/auth/[...nextauth]/route.ts` - Auth endpoints

### API Routes
All admin operations use these API routes:
- **Blogs**: `/api/blog` and `/api/blog/[id]`
- **Activities**: `/api/tours` and `/api/tours/[id]`

## 🎨 Features

### Admin Login Page
- Beautiful gradient background
- Glass morphism design
- Email and password fields
- Error handling
- Responsive design

### Admin Sidebar
- Navigation to all sections
- Responsive (hamburger menu on mobile)
- Active page highlighting
- Quick logout button
- Professional styling

### Blog Management
- Auto-slug generation from title
- Image preview before upload
- Tag support (comma-separated)
- Draft/Published toggle
- Table view with filtering

### Activity Management
- Complete trek details
- Hero image + multiple gallery photos
- Multi-day itinerary builder
- Difficulty levels
- Pricing and seasonal info
- Detailed description with includes/excludes

## 📱 Mobile Responsive

All admin pages are fully responsive:
- Mobile: Hamburger menu sidebar
- Tablet: Collapsed sidebar
- Desktop: Full sidebar + content

## 🐛 Troubleshooting

### "Unauthorized" Error
- Ensure you're logged in with admin credentials
- Check your user has `role: 'admin'` in database

### Images Not Uploading
- Check browser console for errors
- Ensure valid image format (JPG, PNG, etc.)
- Monitor MongoDB storage for base64 images

### Redirect to Login Loop
- Clear browser cookies
- Check NextAuth session storage
- Verify `authOptions` configuration

## 🔄 Workflow Example

### Creating a New Trek
1. Go to `/admin/activities`
2. Click "➕ New Activity"
3. Fill in details:
   - Title, region, activity type
   - Difficulty, duration, price
   - Upload hero image
   - Add gallery photos
   - Add itinerary for each day
4. Click "✅ Create Activity"
5. View it on `/tours` page (if published)

### Creating a Blog Post
1. Go to `/admin/blog`
2. Click "➕ New Blog Post"
3. Fill in details:
   - Title (slug auto-generated)
   - Upload cover image
   - Write excerpt and content
   - Add tags
4. Click "✅ Create Blog Post"
5. View it on `/blog` page (if published)

## 💡 Tips

1. **Auto-slug**: Blog slugs are automatically generated from titles
2. **Drafts**: Use the publish toggle to save as draft first
3. **Images**: Photos are stored as base64 in MongoDB
4. **Itinerary**: Add multiple days for multi-day treks
5. **Tags**: Separate blog tags with commas

## 📊 Admin Dashboard Stats

The main admin page shows:
- Total number of tours
- Total number of enquiries
- Total number of blog posts
- Total gallery items
- Recent enquiries list

## 🚀 Next Steps

1. Create an admin user if needed
2. Visit `/admin-login` to test login
3. Explore the admin dashboard
4. Create your first blog post or activity
5. Publish and view on the public site

## ❓ Questions?

Refer to `ADMIN_DASHBOARD.md` for detailed documentation on all features and API endpoints.
