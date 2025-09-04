Of course. Here is a clear, actionable instruction set for a development team to build the Smart Hajj Ecosystem web portal using Next.js.

---

### **Project: Smart Hajj Ecosystem - Developer Brief**

**Tech Stack:**
*   **Framework:** Next.js 14 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **State Management:** Zustand (for global state) / React Query (TanStack Query for server state)
*   **API Communication:** Axios or TanStack Query
*   **UI Components:** Shadcn/UI (built on Radix UI) for accessible, reusable components.
*   **Data Visualization:** Recharts or Chart.js
*   **Maps:** Google Maps React API or Mapbox

---

### **1. Project Setup & Architecture**

1.  **Initialize Next.js App:**
    ```bash
    npx create-next-app@latest poket-hajj --typescript --tailwind --eslint --app
    cd poket-hajj
    ```
2.  **Install Key Dependencies:**
    ```bash
    npm install @tanstack/react-query zustand axios recharts lucide-react
    npx shadcn-ui@latest init
    ```
3.  **Folder Structure:**
    ```
    src/
    ├── app/
    │   ├── (portal)/
    │   │   ├── dashboard/
    │   │   ├── my-journey/
    │   │   ├── finances/
    │   │   ├── packages/
    │   │   └── layout.tsx  # Main portal layout with sidebar & topbar
    │   └── api/            # Next.js API routes (if needed)
    ├── components/
    │   ├── ui/             # Shadcn/UI components (already there)
    │   ├── portal/         # Portal-specific components (sidebar, topbar)
    │   ├── hajj/           # Hajj-specific reusable components (QueueCard, PackageCard)
    │   └── charts/         # Reusable chart wrappers
    ├── lib/
    │   ├── utils.ts        # Utility functions
    │   ├── api.ts          # Axios instance & API calls
    │   └── store.ts        # Zustand stores
    └── types/
        └── index.ts        # TypeScript type definitions
    ```

---

### **2. Build Global Layout & Reusable Components**

**Instruction 1: Build the Root Portal Layout (`/src/app/(portal)/layout.tsx`)**
*   This layout should include:
    *   A **sidebar component** (`<PortalSidebar />`) with collapsible navigation.
    *   A **topbar component** (`<PortalTopbar />`) with user avatar, notifications, and search.
*   Use [Shadcn's Sheet](https://ui.shadcn.com/docs/components/sheet) component for the mobile-responsive sidebar toggle.
*   Use CSS Flexbox/Grid to manage the main layout structure.

**Instruction 2: Create Reusable Data Display Components**
Build these in `/components/hajj/`:
*   `<KpiCard />`: A reusable card component for displaying key metrics (title, value, icon, trend indicator, optional progress bar). Accepts `title`, `value`, `icon`, `trend`, `progress` as props.
*   `<DataTable />`: Use [Shadcn's Table](https://ui.shadcn.com/docs/components/table) component. Make it generic to accept `data`, `columns`, and `onRowClick` props.
*   `<PackageCard />**: Displays Hajj package info. Props: `packageData: HajjPackage` (with `name`, `price`, `matchScore`, `highlights[]`, `imageUrl`).

---

### **3. Page-Specific Development Instructions**

**Page 1: Dashboard (`/src/app/(portal)/dashboard/page.tsx`)**
*   **Data Fetching:** Use `useQuery` from TanStack Query in a `useEffect`-like pattern to fetch dashboard summary data from our backend API (`/api/user/dashboard`).
*   **UI Assembly:**
    1.  Fetch data on the client. Show a `<Skeleton />` loader (from Shadcn) while loading.
    2.  Render a welcome banner using a simple `<div>` with a background image.
    3.  Use the `<KpiCard />` component to display:
        *   Queue Position (with progress bar)
        *   Savings Goal (with circular progress from `recharts`)
        *   Quick Actions (this can be a custom card with buttons)
    4.  Implement the "Recent Activity" feed using a simple list (`<ul>`) mapping over the `activity` data from the API.

**Page 2: My Hajj Journey (`/src/app/(portal)/my-journey/page.tsx`)**
*   **Data Fetching:** Fetch detailed queue and forecast data from (`/api/user/journey`).
*   **UI Assembly:**
    1.  Display the main summary stats (reuse `<KpiCard />`).
    2.  **Timeline Chart:** Use `Recharts` to build a simple horizontal bar chart representing the timeline. The user's position is a marker on the bar. This is for visual effect only.
    3.  **"Key Influencers" List:** Render a `<ul>` list. Conditionally style list items green (`+`) or red (`-`) based on the `effect` property from the API data.
    4.  **Profile Meter:** Build a custom component using a simple linear progress bar and a list of missing items. The `Complete My Profile` button should link to the settings page.

**Page 3: Package Recommender (`/src/app/(portal)/packages/page.tsx`)**
*   **Data Fetching:** Fetch paginated/filterable package data from (`/api/packages`). Use TanStack Query's `useInfiniteQuery` for infinite scroll or pagination.
*   **State Management:** Use React `useState` to manage filter states (price, dates, etc.).
*   **UI Assembly:**
    1.  Create a sticky `<div>` containing the filter inputs (Sliders, Selects from Shadcn).
    2.  **Debounce Filter Changes:** Use a `useEffect` hook to debounce the filter state. When filters change, trigger a refetch of the package data with the new query parameters.
    3.  Map over the fetched `packages` data and render a `<PackageCard />` for each item.
    4.  Implement a "Load More" button or infinite scroll trigger.

**Page 4: Finances Page (`/src/app/(portal)/finances/page.tsx`)**
*   **Data Fetching:** Fetch account balance and transaction history from (`/api/user/finances`).
*   **UI Assembly:**
    1.  Display the account summary in a `<KpiCard />`.
    2.  Use `Recharts` to render the goal tracker progress bar.
    3.  Use the reusable `<DataTable />` component to display the transaction history. Define the columns for this table specifically (Date, Description, Amount, Status).

---

### **4. State Management & API Integration**

**Instruction 1: Create API Client (`/lib/api.ts`)**
*   Create an Axios instance with a base URL and interceptors to automatically attach auth tokens (from `localStorage` or a context) to requests.

**Instruction 2: Create Zustand Stores (`/lib/store.ts`)**
*   Create a `useAuthStore` to manage global user state (user data, tokens).
*   Create a `useFiltersStore` to manage the state of filters on the Packages page. This keeps the filter state persistent if the user navigates away and comes back.

**Instruction 3: Implement API Calls**
*   Write all API call functions in `lib/api.ts` (e.g., `const fetchDashboardData = async (): Promise<DashboardData> => { ... }`).
*   Use these functions inside your TanStack Query `useQuery` hooks.

---

### **5. Key Features to Implement**

1.  **Authentication:** Implement a login flow. Use NextAuth.js or a custom context with protected routes. The layout should redirect unauthenticated users.
2.  **Responsive Design:** Use Tailwind's responsive modifiers (`md:`, `lg:`) to ensure all components look good on mobile. The sidebar should collapse into a drawer on small screens.
3.  **Loading & Error States:** Every `useQuery` must handle `isLoading` and `isError` states. Display Skeletons for loading and a helpful message for errors.
4.  **Type Safety:** Define all TypeScript interfaces for your API responses and component props in `/types/index.ts`. **Do not use `any`.**

**Next Steps for Dev Team:**
1.  Set up the project and initial structure.
2.  Build the global layout, sidebar, and topbar.
3.  Create the reusable components (`KpiCard`, `DataTable`).
4.  Implement the Dashboard page first as a template.
5.  Move on to the other pages, integrating the API calls and state management.

This provides a solid foundation. Let me know when the basic structure is in place, and we can break down each page and component into even more detailed tickets.