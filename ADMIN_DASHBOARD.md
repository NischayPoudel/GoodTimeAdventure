# Admin Dashboard Documentation

## Overview
This admin dashboard provides complete management for the GoodTime Adventure website. Admins can manage blogs, activities/treks, enquiries, and gallery items with full CRUD (Create, Read, Update, Delete) functionality.

## Access
- **Admin Login**: `http://localhost:3000/admin-login`
- **Admin Dashboard**: `http://localhost:3000/admin`

## Features

### 1. Admin Authentication
- Secure login page with credentials (email & password)
- Only users with `admin` role can access the dashboard
- Session-based authentication using NextAuth.js
- Logout functionality

### 2. Blog Management
**Location**: `/admin/blog`

#### Features:
- ✅ **Create** new blog posts with:
  - Title (auto-generates slug)
  - Cover image upload
  - Excerpt and content
  - Tags (comma-separated)
  - Publish status toggle
- 📝 **Edit** existing blog posts
- 🗑️ **Delete** blog posts
- 📊 View all blog posts in a table with:
  - Title and excerpt
  - Publication status (Published/Draft)
  - Creation date
  - Action buttons (Edit/Delete)

**API Endpoints**:
- `GET /api/blog` - Fetch all blog posts
- `POST /api/blog` - Create new blog post
- `GET /api/blog/{id}` - Fetch single blog post
- `PUT /api/blog/{id}` - Update blog post
- `DELETE /api/blog/{id}` - Delete blog post

### 3. Activities/Treks Management
**Location**: `/admin/activities`

#### Features:
- ✅ **Create** new activities with:
  - Title, region, activity type
  - Difficulty level (Easy, Moderate, Hard, Expert)
  - Duration and maximum altitude
  - Best season, pricing
  - Detailed overview
  - What's included/excluded lists
  - Multi-day itinerary planning
  - **Hero image upload**
  - **Multiple gallery photos**
  - Publish status toggle

- 📝 **Edit** existing activities
  - Update all fields
  - Add/remove gallery photos
  - Modify itinerary details

- 🗑️ **Delete** activities
- 📊 View all activities in a table with:
  - Title and region
  - Activity type and difficulty
  - Duration and pricing
  - Publication status
  - Quick action buttons

#### Photo Management:
- **Hero Image**: Main image for the trek
- **Gallery Images**: Multiple photos showcasing the trek
  - Upload multiple at once
  - Preview thumbnails
  - Remove individual photos
  - Images stored as base64 in database

**API Endpoints**:
- `GET /api/tours?admin=true` - Fetch all activities (published & draft)
- `POST /api/tours` - Create new activity
- `GET /api/tours/{id}` - Fetch single activity
- `PUT /api/tours/{id}` - Update activity
- `DELETE /api/tours/{id}` - Delete activity

### 4. Sidebar Navigation
The admin sidebar provides quick access to all sections:
- 📊 Dashboard - Overview and statistics
- 📝 Blog Posts - Blog management
- 🏔️ Activities/Treks - Activity management
- 📧 Enquiries - Customer enquiries
- 🖼️ Gallery - Gallery management
- 🚪 Logout

### 5. Dashboard Overview
**Location**: `/admin`

Displays:
- Total number of tours
- Total number of enquiries
- Total number of blog posts
- Total number of gallery items
- Recent enquiries list

## Admin Sidebar Features

- **Responsive Design**: Works on mobile (hamburger menu) and desktop
- **Active Navigation**: Highlights current page
- **Mobile Menu**: Click hamburger icon to toggle sidebar on mobile
- **Quick Logout**: Logout button at the bottom

## Authentication Details

### Required Admin User
To access the admin dashboard, you need:
- Email: admin user email in database
- Password: hashed in database
- Role: `'admin'` in User model

### Create Admin User (if needed)
```javascript
// In seed script or manually:
const user = new User({
  name: 'Admin',
  email: 'admin@example.com',
  passwordHash: bcrypt.hashSync('password123', 10),
  role: 'admin'
})
await user.save()
```

## File Structure

```
src/app/
├── (auth)/
│   └── admin-login/
│       └── page.tsx          # Admin login page
├── admin/
│   ├── layout.tsx            # Admin layout with sidebar
│   ├── page.tsx              # Dashboard overview
│   ├── blog/
│   │   ├── page.tsx          # Blog list
│   │   ├── new/
│   │   │   └── page.tsx      # Create blog
│   │   └── [id]/
│   │       └── page.tsx      # Edit blog
│   └── activities/
│       ├── page.tsx          # Activities list
│       ├── new/
│       │   └── page.tsx      # Create activity
│       └── [id]/
│           └── page.tsx      # Edit activity
└── api/
    ├── blog/
    │   ├── route.ts          # GET/POST blogs
    │   └── [id]/route.ts     # GET/PUT/DELETE blog
    └── tours/
        ├── route.ts          # GET/POST tours
        └── [id]/route.ts     # GET/PUT/DELETE tour

src/components/
└── AdminSidebar.tsx          # Navigation sidebar

src/lib/
└── auth.ts                   # NextAuth configuration
```

## Styling

The admin dashboard uses:
- **Tailwind CSS** for styling
- **Glass morphism** theme (matching site design)
- **Responsive design** for mobile and desktop
- **Color scheme**:
  - Primary: Emerald (buttons, accents)
  - Secondary: Blue (inputs, hover states)
  - Danger: Red (delete actions)
  - Status: Green (published), Yellow (draft)

## Important Notes

1. **Image Handling**: Images are stored as base64 strings in MongoDB
2. **Slug Generation**: Blog slugs are auto-generated from titles
3. **Validation**: All required fields must be filled before submission
4. **Admin Role**: Session check ensures only admin users can access
5. **Soft Delete**: Currently implements hard delete (consider adding soft delete in future)

## Security Considerations

1. ✅ Authentication required for all admin routes
2. ✅ Role-based access control (admin only)
3. ✅ Server-side authentication checks
4. ✅ Password hashing with bcryptjs
5. ⚠️ Consider: CSRF tokens for forms
6. ⚠️ Consider: Rate limiting on API endpoints
7. ⚠️ Consider: Audit logging for changes

## Future Enhancements

1. **Batch Operations**: Delete multiple items at once
2. **Soft Delete**: Archive instead of permanent delete
3. **Undo/Redo**: Track changes with rollback
4. **Image Optimization**: Compress and resize images
5. **Search & Filter**: Advanced filtering in lists
6. **Export**: Export data to CSV/Excel
7. **Activity Photos**: Enhanced photo management with cropping
8. **SEO**: Manage meta tags and descriptions
9. **Scheduling**: Schedule posts for future publication
10. **Analytics**: View post views and engagement

## Troubleshooting

### Admin Login Issues
- Ensure user exists in database with admin role
- Check password is correct (case-sensitive)
- Verify NextAuth configuration

### Image Upload Issues
- Check browser console for errors
- Ensure file is valid image format
- Monitor database size if using many base64 images

### API Errors
- Check authentication token is valid
- Verify data format matches schema
- Check MongoDB connection

## Contact
For issues or questions about the admin system, please refer to the main project documentation.
