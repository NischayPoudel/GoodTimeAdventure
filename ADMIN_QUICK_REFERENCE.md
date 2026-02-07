# Admin Dashboard - Quick Reference Card

## 🔑 Access Points

| Page | URL | Purpose |
|------|-----|---------|
| Login | `/admin-login` | Login to admin dashboard |
| Dashboard | `/admin` | Overview & statistics |
| Blogs | `/admin/blog` | Manage blog posts |
| Activities | `/admin/activities` | Manage treks & activities |
| Enquiries | `/admin/enquiries` | View customer enquiries |
| Gallery | `/admin/gallery` | Manage gallery items |

## 👤 Default Admin Credentials

```
Email: admin@goodtimeadventure.com
Password: Admin@12345
```

**Created by**: `node scripts/create-admin.mjs`

## 📋 CRUD Operations

### Blog Posts

#### Create
- URL: `/admin/blog/new`
- Required: Title, Content, Cover Image
- Optional: Tags, Excerpt, Publish status

#### Read
- URL: `/admin/blog`
- Shows: All blog posts in table
- Displays: Title, Status, Date

#### Update
- URL: `/admin/blog/[id]`
- Change: Any blog field
- Update: Cover image, tags, status

#### Delete
- Button: "Delete" on list view
- Confirmation: Required
- Effect: Permanent deletion

### Activities/Treks

#### Create
- URL: `/admin/activities/new`
- Required: Title, Region, Hero Image
- Optional: Gallery photos, Itinerary, Details

#### Read
- URL: `/admin/activities`
- Shows: All activities in table
- Displays: Title, Type, Difficulty, Price

#### Update
- URL: `/admin/activities/[id]`
- Change: Any field
- Modify: Photos, itinerary, pricing

#### Delete
- Button: "Delete" on list view
- Confirmation: Required
- Effect: Permanent deletion

## 🖼️ Photo Management

### Blog Cover Image
```
Size: Single image
Format: JPG, PNG, GIF, WebP
Max: 2-5 MB
Storage: Base64 in database
```

### Activity Hero Image
```
Size: Single main image
Format: JPG, PNG, GIF, WebP
Max: 2-5 MB
Storage: Base64 in database
Purpose: Main trek photo
```

### Activity Gallery
```
Size: Multiple photos
Format: JPG, PNG, GIF, WebP
Max: 5-10 photos recommended
Max per file: 2-5 MB
Storage: Base64 in database
Purpose: Trek showcase
```

## 📝 Form Fields

### Blog Post Form
```
✓ Title (Required, auto-slug)
✓ Cover Image (Required, with preview)
✓ Excerpt (Required, summary)
✓ Content (Required, main text)
✓ Tags (Optional, comma-separated)
✓ Published (Optional, toggle)
```

### Activity Form

#### Basic Info
```
✓ Title (Required)
✓ Region (Required)
✓ Activity Type (Required)
✓ Difficulty (Required: Easy/Moderate/Hard/Expert)
✓ Duration Days (Required)
✓ Max Altitude (Optional)
✓ Best Season (Required)
✓ Price From (Required, in ₹)
```

#### Images
```
✓ Hero Image (Required)
✓ Gallery Photos (Optional, multiple)
```

#### Description
```
✓ Overview (Required)
✓ Includes (Optional, list)
✓ Excludes (Optional, list)
```

#### Itinerary
```
✓ Day 1: Title + Details
✓ Day 2: Title + Details
✓ ... (Add more days as needed)
```

#### Publishing
```
✓ Published (Optional, toggle)
```

## 🎯 Common Tasks

### Create a Blog Post
```
1. Go to /admin/blog
2. Click ➕ New Blog Post
3. Fill title, upload image
4. Write excerpt & content
5. Click ✅ Create Blog Post
6. View at /blog/[slug]
```

### Create a Trek
```
1. Go to /admin/activities
2. Click ➕ New Activity
3. Fill basic info
4. Upload hero image
5. Add gallery photos
6. Fill description
7. Add itinerary days
8. Click ✅ Create Activity
9. View at /tours/[slug]
```

### Update Content
```
1. Click "Edit" on item
2. Modify fields
3. Update photos if needed
4. Click 💾 Save Changes
5. Changes live immediately
```

### Delete Content
```
1. Click "Delete" button
2. Confirm deletion
3. Item removed permanently
```

## ⚡ Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Focus Search | Ctrl+K (coming soon) |
| Save Form | Ctrl+Enter (coming soon) |
| Cancel | Esc |

## 🎨 UI Elements Guide

### Buttons
```
✅ Green (Emerald) - Create/Save/Publish
❌ Red - Delete
📝 Blue - Edit
🔄 Gray - Cancel/Secondary
```

### Status Badges
```
🟢 Published - Green background
🟡 Draft - Yellow background
✅ Easy - Green text
🟡 Moderate - Yellow text
🔴 Hard - Red text
```

### Icons Used
```
📊 Dashboard
📝 Blog Posts
🏔️ Activities
📧 Enquiries
🖼️ Gallery
📤 Upload
📸 Photos
✏️ Edit
🗑️ Delete
➕ Add New
🚪 Logout
☰ Menu
```

## 📊 Dashboard Stats

The admin dashboard shows:
- **Tours Count**: Total treks/activities
- **Enquiries Count**: Customer inquiries
- **Blog Count**: Total blog posts
- **Gallery Count**: Total photos
- **Recent Enquiries**: Last 5 enquiries

## 🔐 Authentication

### Login
```
1. Visit /admin-login
2. Enter email
3. Enter password
4. Click "Sign In"
5. Redirected to /admin
```

### Logout
```
1. Click "🚪 Logout" in sidebar
2. Redirected to /admin-login
3. Session cleared
```

### Session
```
Duration: Configurable (default 24 hours)
Storage: Secure HTTP-only cookie
Renewal: Automatic on activity
```

## 🐛 Error Messages

| Error | Cause | Fix |
|-------|-------|-----|
| "Unauthorized" | Not admin user | Login with admin account |
| "Image required" | No image uploaded | Upload image |
| "Invalid input" | Form field error | Check all fields |
| "Server error" | Database issue | Check MongoDB |
| "Not found" | Item deleted | Refresh page |

## 📱 Mobile Tips

- **Menu**: Click ☰ to toggle sidebar
- **Landscape**: Sidebar hides automatically
- **Touch**: All buttons are touch-friendly
- **Scroll**: Forms scroll smoothly
- **Back**: Use browser back button

## ⚙️ Settings

### Image Settings
```
Max Size: 5 MB per image
Formats: JPG, PNG, GIF, WebP
Preview: Automatic on upload
Storage: Database (base64)
```

### Form Settings
```
Auto-save: Not enabled (explicit save required)
Validation: Client & server-side
Slugs: Auto-generated (editable)
Timestamps: Automatic
```

## 🆘 Quick Help

**Password Reset**: Not yet implemented
**Export Data**: Coming soon
**Bulk Upload**: Coming soon
**Scheduling**: Coming soon

## 📞 Support Files

- **ADMIN_README.md** - Overview & setup
- **ADMIN_DASHBOARD.md** - Full documentation
- **ADMIN_SETUP.md** - Quick start guide
- **ADMIN_VISUAL_GUIDE.md** - Visual walkthrough
- **ADMIN_IMPLEMENTATION_SUMMARY.md** - Technical details

## ✨ Tips & Tricks

1. **Auto-slug**: Title auto-generates slug (editable)
2. **Image Preview**: See image before saving
3. **Quick Delete**: Confirm deletion in popup
4. **Draft Mode**: Save as draft before publishing
5. **Multiple Photos**: Upload multiple gallery photos at once
6. **Itinerary**: Add days dynamically

## 🚀 Performance Tips

- ✅ Keep images under 2MB
- ✅ 5-10 gallery photos ideal
- ✅ 2-14 days per itinerary
- ✅ Short, descriptive titles
- ✅ Clear, concise descriptions

## 📈 Content Guidelines

### Blog Posts
```
Title: 50-60 characters
Excerpt: 150-160 characters  
Content: 500+ words
Cover Image: High quality
Tags: 3-5 relevant tags
```

### Activities
```
Title: 30-50 characters
Overview: 100-200 words
Difficulty: Clear level
Duration: Accurate days
Price: In Indian Rupees (₹)
Gallery: 5-10 photos
Itinerary: Day-by-day details
```

---

**Print this card for quick reference!** 📋
