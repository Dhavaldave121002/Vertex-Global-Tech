/**
 * API Utility
 * Connects frontend to PHP/MySQL backend
 */

const API_BASE_URL = 'http://localhost/Vertex/public/api'; // Standard for XAMPP

const ALLOWED_SERVICES = [
  'blogs', 'blog_posts', 'users', 'accounting', 'testimonials', 'teams', 
  'careers', 'jobs', 'applications', 'projects', 'tech_stack', 'timeline', 
  'brands', 'leads', 'referrals', 'pricing', 'pricing_faqs', 'subscribers', 'contacts'
];

export const api = {
  /**
   * Fetch all records from a table
   */
  fetchAll: async (service) => {
    if (ALLOWED_SERVICES.includes(service)) {
      try {
        // Map service name to endpoint file
        let endpoint = 'blogs.php';
        if (service === 'users') endpoint = 'users.php';
        if (service === 'accounting') endpoint = 'accounting.php';
        if (service === 'testimonials') endpoint = 'testimonials.php';
        if (service === 'teams') endpoint = 'teams.php';
        if (service === 'careers' || service === 'jobs') endpoint = 'jobs.php';
        if (service === 'applications') endpoint = 'applications.php';
        if (service === 'projects') endpoint = 'projects.php';
        if (service === 'tech_stack') endpoint = 'tech_stack.php';
        if (service === 'timeline') endpoint = 'timeline.php';
        if (service === 'brands') endpoint = 'brands.php';
        if (service === 'leads') endpoint = 'leads.php';
        if (service === 'referrals') endpoint = 'referrals.php';
        if (service === 'pricing') endpoint = 'pricing.php';
        if (service === 'pricing_faqs') endpoint = 'pricing_faqs.php';
        if (service === 'subscribers') endpoint = 'subscribers.php';
        if (service === 'contacts') endpoint = 'contacts.php';

        const response = await fetch(`${API_BASE_URL}/${endpoint}`);
        const data = await response.json();
        return data; 
      } catch (error) {
        console.error(`Error fetching ${service}:`, error);
        return [];
      }
    } else {
      // Fallback to localStorage for prototypes
      const data = localStorage.getItem(`vertex_${service}`);
      return data ? JSON.parse(data) : [];
    }
  },

  /**
   * Save a record (Create or Update)
   */
  save: async (service, data) => {
    if (ALLOWED_SERVICES.includes(service)) {
      try {
        let endpoint = 'blogs.php';
        if (service === 'users') endpoint = 'users.php';
        if (service === 'accounting') endpoint = 'accounting.php';
        if (service === 'testimonials') endpoint = 'testimonials.php';
        if (service === 'teams') endpoint = 'teams.php';
        if (service === 'careers' || service === 'jobs') endpoint = 'jobs.php';
        if (service === 'applications') endpoint = 'applications.php';
        if (service === 'projects') endpoint = 'projects.php';
        if (service === 'tech_stack') endpoint = 'tech_stack.php';
        if (service === 'timeline') endpoint = 'timeline.php';
        if (service === 'brands') endpoint = 'brands.php';
        if (service === 'leads') endpoint = 'leads.php';
        if (service === 'referrals') endpoint = 'referrals.php';
        if (service === 'pricing') endpoint = 'pricing.php';
        if (service === 'pricing_faqs') endpoint = 'pricing_faqs.php';
        if (service === 'subscribers') endpoint = 'subscribers.php';
        if (service === 'contacts') endpoint = 'contacts.php';

        const method = data.id ? 'PUT' : 'POST';
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        return await response.json();
      } catch (error) {
        console.error(`Error saving ${service}:`, error);
        throw error;
      }
    } else {
      // LocalStorage Fallback
      const current = await api.fetchAll(service);
      if (data.id) {
        const index = current.findIndex(item => item.id === data.id);
        if (index !== -1) current[index] = data;
      } else {
        data.id = Date.now();
        current.push(data);
      }
      localStorage.setItem(`vertex_${service}`, JSON.stringify(current));
      return data;
    }
  },

  /**
   * Delete a record
   */
  delete: async (service, id) => {
    if (ALLOWED_SERVICES.includes(service)) {
      try {
        let endpoint = 'blogs.php';
        if (service === 'users') endpoint = 'users.php';
        if (service === 'accounting') endpoint = 'accounting.php';
        if (service === 'testimonials') endpoint = 'testimonials.php';
        if (service === 'teams') endpoint = 'teams.php';
        if (service === 'careers' || service === 'jobs') endpoint = 'jobs.php';
        if (service === 'applications') endpoint = 'applications.php';
        if (service === 'projects') endpoint = 'projects.php';
        if (service === 'tech_stack') endpoint = 'tech_stack.php';
        if (service === 'timeline') endpoint = 'timeline.php';
        if (service === 'brands') endpoint = 'brands.php';
        if (service === 'leads') endpoint = 'leads.php';
        if (service === 'referrals') endpoint = 'referrals.php';
        if (service === 'pricing') endpoint = 'pricing.php';
        if (service === 'pricing_faqs') endpoint = 'pricing_faqs.php';
        if (service === 'subscribers') endpoint = 'subscribers.php';
        if (service === 'contacts') endpoint = 'contacts.php';

        const response = await fetch(`${API_BASE_URL}/${endpoint}?id=${id}`, {
          method: 'DELETE'
        });
        return await response.json();
      } catch (error) {
        console.error(`Error deleting ${service}:`, error);
        throw error;
      }
    } else {
      // LocalStorage Fallback
      const current = await api.fetchAll(service);
      const filtered = current.filter(item => item.id !== id);
      localStorage.setItem(`vertex_${service}`, JSON.stringify(filtered));
      return { success: true };
    }
  },

  /**
   * Config Operations (Single Key-Value pairs)
   */
  fetchConfig: async (key) => {
    try {
      const response = await fetch(`${API_BASE_URL}/site_config.php?key=${key}`);
      const data = await response.json();
      return data; // site_config.php returns the value directly (parsed JSON)
    } catch (error) {
      console.error(`Error fetching config ${key}:`, error);
      return null;
    }
  },

  saveConfig: async (key, value) => {
    try {
      const response = await fetch(`${API_BASE_URL}/site_config.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key, value }),
      });
      return await response.json();
    } catch (error) {
      console.error(`Error saving config ${key}:`, error);
      return { success: false, error: error.message };
    }
  }
};
