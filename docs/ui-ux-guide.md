Of course. This is a critical step to align the development and design teams. Here is a detailed UI/UX specification for the "Smart Hajj Ecosystem" modules, framed as a brief for a UI/UX designer.

---

### **Project: Smart Hajj Ecosystem - UI/UX Specification**

**Objective:** Design a seamless, user-centric web application portal that integrates with the existing Poket app, serving as the primary interface for Tabung Haji pilgrims. The design must instill trust, simplify complex processes, and provide clarity at every step.

**Platform:** Responsive Web App (Desktop-First, mobile-responsive)
**Style Guide:** Adhere to the existing **Poket Design System** (Brand Colours, Typography, Components) but incorporate a distinct "Hajj" identity through subtle imagery (e.g., Kaaba silhouette, neutral landscapes) and a calming, trustworthy colour palette (blues, greens, whites).

**Global Layout: Portal Structure**
*   **Top Bar:** User Avatar & Name, Notifications Bell, Quick Search, Language Selector (BM/English).
*   **Sidebar (Main Navigation):** Collapsible. Contains the following primary menu items:
    *   Dashboard (Home)
    *   My Hajj Journey
    *   My Finances
    *   Zakat & Sadaqah
    *   Settings & Help
    *   (Logo at the bottom)

---

### **Screen 1: Dashboard (Home Screen)**

**Purpose:** The personalized landing page, providing a holistic overview of the user's Hajj journey and quick access to key actions.

**UI Layout & Components:**

1.  **Hero Welcome Banner:**
    *   *Text:* "Selamat Datang, [User Name]! Your journey to Hajj made simple, smart & secure."
    *   *Visual:* Subtle, inspiring image of Makkah.

2.  **Key Status Cards (Horizontal Grid):**
    *   **Queue Position Card:**
        *   Title: **Hajj Registration Status**
        *   Large Text: `#153,238 / 1,000,000`
        *   Progress Bar: Visual representation of position in the queue.
        *   Subtext: *"Estimated Year: 2040"* (with a tooltip icon explaining the AI prediction).
        *   Button: `View Detailed Analysis`
    *   **Financial Health Card:**
        *   Title: **Hajj Savings Goal**
        *   Large Text: `RM 24,500 / RM 50,000`
        *   Circular Progress Bar: Showing 49% completion.
        *   Subtext: *"On track for your 2040 goal."*
        *   Button: `Top Up Savings`
    *   **Quick Actions Card:**
        *   Title: **Next Steps**
        *   Buttons: `Pay Upcoming Fees`, `Update Profile`, `Explore Packages`, `Contact Support`

3.  **Recent Activity Feed:**
    *   A chronological list of recent events.
    *   *Example Items:* "Your savings transfer of RM500 was successful.", "Your queue position moved up by 150 spots.", "A new package matching your profile is available."

**UX Notes:** This screen should answer the user's most important questions instantly: "Where am I in the queue?" and "Am I on track financially?". Use positive reinforcement and clear data visualizations.

---

### **Screen 2: My Hajj Journey / Smart Registration & Queue Details**

**Purpose:** To provide deep, transparent insights into the user's registration status and the AI-powered predictions.

**UI Layout & Components:**

1.  **Page Title:** **My Hajj Journey**

2.  **Main Summary Panel:** Reiterates the key stats from the dashboard (Queue #, Estimate) in more detail.

3.  **AI Insights Section:**
    *   **Header:** "Your Personalized Forecast"
    *   **Visual:** An interactive timeline graph. The user's estimated year (2040) is marked prominently.
    *   **Key Influencers List:** "Your forecast is based on:"
        *   `+` Consistent monthly savings
        *   `-` Your current age (55) - *[Tooltip: Younger applicants generally have longer waits]*
        *   `=` Projected annual intake of pilgrims
    *   *Button: `How can I improve my position?`* (This triggers the AI advisor chatbot)

4.  **Profile Completeness Meter:**
    *   "Boost your application! A complete profile improves our estimation accuracy."
    *   Show a score (e.g., 70% Complete) and list missing items: `Health Certificate`, `Next of Kin Details`.
    *   *Button: `Complete My Profile`*

**UX Notes:** Demystify the "black box" of the waiting list. The AI insights should feel explanatory, not deterministic. Empower the user by showing them factors they can control.

---

### **Screen 3: AI Hajj Package Recommender**

**Purpose:** To allow users to browse and select Hajj packages tailored to their specific needs and budget.

**UI Layout & Components:**

1.  **Page Title:** **Explore Hajj Packages**
    *   Subtitle: "Curated for you by AI, based on your profile & budget."

2.  **Filters Bar (Sticky):**
    *   Filters: `Price Range (Slider)`, `Travel Dates`, `Hotel Rating (Stars)`, `Airline`, `Special Needs (Wheelchair access, etc.)`

3.  **Package List/Grid View:**
    *   **Each Package Card should show:**
        *   A featured image of the hotel or airline.
        *   Package Name & Provider (e.g., "Deluxe Package by TH Travel").
        *   **AI Match Score:** e.g., `95% Match` (with a filled-in star or heart icon).
        *   Key Highlights: "5-Star Hotel", "500m from Haram", "Malaysia Airlines".
        *   **Total Price:** `RM 49,900`
        *   *Button: `See Details & Book`*

4.  **Empty State:** If no filters match, show: "No packages found. Try adjusting your filters or chat with our advisor for help."

**UX Notes:** This should feel like a modern e-commerce experience. The "AI Match Score" is a crucial trust signal that encourages engagement. The filters must be powerful and responsive.

---

### **Screen 4: Unified Financial Ecosystem**

**Purpose:** To be the single, unified platform for all Hajj-related finances.

**UI Layout & Components:**

1.  **Page Title:** **My Hajj Finances**

2.  **Account Summary:**
    *   A card showing the linked **Tabung Haji Account Number** and its **Current Balance**.

3.  **Visual Goal Tracker:**
    *   "Your Goal: RM 50,000 by 2040"
    *   A large, elegant progress bar.
    *   "Monthly Target: RM 500" with a button: `Setup Auto-Deposit`.

4.  **Transaction History Table:**
    *   Standard data table with columns: `Date`, `Description`, `Amount (RM)`, `Status`.
    *   Filter by: Date Range, Type (Deposit, Payment, Refund).

5.  **Quick Action Buttons:**
    *   `Transfer to TH Account`, `Pay Pilgrimage Fees`, `View Payment Schedule`, `Download Statement`

**UX Notes:** The design must scream "security" and "clarity." Every transaction must be easily traceable. The goal tracker provides motivation and a clear path forward.

---

### **Screen 5: (B2B) TH Admin Dashboard**

**Purpose:** To provide Tabung Haji administrators with a real-time, data-rich overview of the entire Hajj operation.

**UI Layout & Components:**

1.  **Overview KPI Dashboard:**
    *   **Large KPI Cards:** `Total Applicants`, `Current Year Pilgrims`, `Total Collections (YTD)`, `Avg. Wait Time`.
    *   **Charts:**
        *   *Line Chart:* Application Trend Over 5 Years.
        *   *Bar Chart:* Pilgrim Demographic Breakdown (Age, State).
        *   *Pie Chart:* Package Type Distribution.

2.  **Real-Time Operations Map:**
    *   An interactive map of Malaysia with heatmaps showing applicant concentration by region.
    *   *Filter by:* Year, Registration Status.

3.  **Alerts & Anomalies Module:**
    *   A dedicated panel titled "AI Alerts".
    *   List items like: "⚠️ Unusual withdrawal pattern detected on Account #XXXX", "12 package bookings pending payment confirmation for >72h".
    *   Each alert is actionable, with buttons: `Review`, `Dismiss`, `Escalate`.

4.  **Navigation:** This portal would have its own sidebar with items like: `Dashboard`, `Pilgrim Management`, `Financial Reports`, `Package Management`, `Compliance Center`, `System Settings`.

**UX Notes:** This interface is for power users. Information density is high, but must be impeccably organized. Prioritize actionable insights and real-time data. Use colour strategically (green for good, red for alerts, blue for neutral info).

---

This detailed spec provides a clear roadmap for a designer to start creating high-fidelity mockups and prototypes, ensuring the final product is both beautiful and highly functional.