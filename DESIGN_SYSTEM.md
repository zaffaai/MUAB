# MUAB Design System

A comprehensive, Stripe-inspired design system for consistent UI/UX across all pages.

## 🎨 Design Principles

1. **Softer Aesthetics**: Rounded corners (8-16px), subtle shadows, gentle gradients
2. **Consistent Spacing**: Using 4px/8px grid system
3. **Unified Components**: Reusable Button, Table, Card, Input components
4. **Accessible**: WCAG AA compliant colors and interactions
5. **Dark Mode Ready**: All components support dark theme

## 📦 Components

### Button
Primary, secondary, outline, ghost, and danger variants with consistent styling.

```tsx
import Button from '@/components/ui/Button';

<Button variant="primary" size="md">Save Changes</Button>
<Button variant="outline" icon={<i className="fas fa-plus" />}>Add New</Button>
<Button variant="danger" loading>Deleting...</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean
- `icon`: React.ReactNode

### Card
Container component with consistent padding and shadows.

```tsx
import { Card, CardHeader, CardContent } from '@/components/ui/Card';

<Card>
  <CardHeader 
    title="Dashboard" 
    description="Overview of your account"
    action={<Button variant="outline">Edit</Button>}
  />
  <CardContent>
    {/* Content here */}
  </CardContent>
</Card>
```

### Table
Responsive table with hover states and loading states.

```tsx
import Table from '@/components/ui/Table';

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { 
    key: 'status', 
    header: 'Status',
    render: (item) => <Badge variant="success">{item.status}</Badge>
  },
];

<Table data={users} columns={columns} loading={isLoading} />
```

### Input
Form input with label, error states, and icons.

```tsx
import Input from '@/components/ui/Input';

<Input
  label="Email Address"
  type="email"
  placeholder="you@example.com"
  icon={<i className="fas fa-envelope" />}
  error={errors.email}
/>
```

### Select
Dropdown with consistent styling.

```tsx
import Select from '@/components/ui/Select';

<Select
  label="Category"
  options={[
    { value: 'video', label: 'Video Course' },
    { value: 'ebook', label: 'E-Book' },
  ]}
/>
```

### Badge
Status indicators and tags.

```tsx
import Badge from '@/components/ui/Badge';

<Badge variant="success">Active</Badge>
<Badge variant="purple" icon={<i className="fas fa-video" />}>Live</Badge>
```

**Variants:** default, success, warning, error, info, purple, pink

## 🎨 Design Tokens

### Border Radius
- `rounded-lg`: 8px (default for buttons, inputs)
- `rounded-xl`: 12px (cards, modals)
- `rounded-2xl`: 16px (hero sections)
- `rounded-full`: Pills and avatars

### Shadows
- `shadow-sm`: Subtle elevation for cards
- `shadow-md`: Hover states
- `shadow-lg`: Modals and popovers

### Spacing
- Use Tailwind's spacing scale: `p-4`, `p-6`, `gap-4`, etc.
- Consistent padding: Cards use `p-6`, inputs use `py-2.5 px-4`

### Colors
- **Primary**: Purple gradient (purple-600 to purple-700)
- **Success**: Green (green-600)
- **Warning**: Amber (amber-600)
- **Error**: Red (red-600)
- **Neutrals**: Gray scale (gray-50 to gray-900)

## 📋 Usage Guidelines

### Buttons
- Use `primary` for main actions (Save, Submit, Create)
- Use `outline` for secondary actions (Cancel, Edit)
- Use `ghost` for tertiary actions (in toolbars)
- Use `danger` for destructive actions (Delete, Remove)

### Tables
- Always include hover states
- Use badges for status columns
- Keep row actions on the right
- Provide empty and loading states

### Cards
- Use for grouping related content
- Always include CardHeader for titles
- Maintain consistent padding (default `p-6`)

### Forms
- Always provide labels for inputs
- Show validation errors below fields
- Use helper text for additional context
- Group related fields together

## 🚀 Migration Guide

To update an existing page:

1. Replace hardcoded buttons with `<Button>` component
2. Wrap content sections in `<Card>` components
3. Use `<Table>` for data tables
4. Replace custom inputs with `<Input>` and `<Select>`
5. Update border radius: `rounded-xl` for cards, `rounded-lg` for buttons
6. Ensure consistent spacing using the spacing scale

## 🎯 Examples

See these pages for reference:
- `/dashboard` - Card layouts, stat cards
- `/finance` - Tables with actions
- `/digital-products` - Grid layouts with cards
- `/settings` - Form inputs and buttons
