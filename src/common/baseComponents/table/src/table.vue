<template>
  
  <div class="multi-table-wrapper">
    <div class="table-controls" v-if="showControls">
      <input type="text" v-model="searchTerm" placeholder="搜索表格..." @input="onSearchInput" class="search-input"/>
    </div>
    <slot name="controls"></slot>
    <div class="table-container">
      <table class="multi-table">
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              @click="column.sortable ? sortBy(column.key) : null"
              :class="{ sortable: column.sortable, sorted: currentSortKey === column.key }"
              :aria-sort="getAriaSort(column.key)"
            >
              {{ column.label }}
              <span v-if="column.sortable" class="sort-icon">
                <span v-if="currentSortKey === column.key">{{ currentSortDirection === 'asc' ? '▲' : '▼' }}</span>
                <span v-else>↕</span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading" class="state-row">
            <td :colspan="columns.length">
              <slot name="loading">
                <div class="loading-state">加载中...</div>
              </slot>
            </td>
          </tr>
          <tr v-else-if="paginatedData.length === 0" class="state-row">
            <td :colspan="columns.length">
              <slot name="empty">
                <div class="empty-state">没有可显示的数据。</div>
              </slot>
            </td>
          </tr>
          <tr v-else v-for="(row, rowIndex) in paginatedData" :key="`row-${rowIndex}`" @click="onRowClick(row)">
            <td v-for="column in columns" :key="`${column.key}-${rowIndex}`">
              <slot :name="column.slotName || `cell-${column.key}`" :row="row" :value="getCellValue(row, column.key)">
                {{ getCellValue(row, column.key) }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    <slot name="controls"></slot>
  </div>

    <div class="pagination-controls" v-if="totalPages > 1 && !loading">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">上一页</button>
      <span>第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">下一页</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultiFunctionalTable', // Component name (good practice)
  props: {
    data: { type: Array, required: true },
    columns: { type: Array, required: true },
    itemsPerPage: { type: Number, default: 10 },
    loading: { type: Boolean, default: false },
    initialSortKey: { type: String, default: null },
    initialSortDirection: { type: String, default: null }, // 'asc' or 'desc'
  },
  emits: ['update:sort', 'update:page', 'row:click'], // Declare emitted events

  data() {
    return {
      // Internal reactive state
      searchTerm: '',
      // Initialize internal sort state from props
      currentSortKey: this.initialSortKey,
      currentSortDirection: this.initialSortDirection,
      currentPage: 1,
    };
  },

  computed: {
    // 1. Filtered Data
    searchableColumns() {
      return this.columns.filter(col => col.searchable !== false).map(col => col.key);
    },

    filteredData() {
      if (!this.searchTerm) {
        return this.data;
      }
      const lowerSearchTerm = this.searchTerm.toLowerCase();
      return this.data.filter(row => {
        return this.searchableColumns.some(key => {
          const value = this.getCellValue(row, key); // Use method here
          return value !== null && value !== undefined && String(value).toLowerCase().includes(lowerSearchTerm);
        });
      });
    },

    // 2. Sorted Data
    sortedData() {
      if (!this.currentSortKey || !this.currentSortDirection) {
        return this.filteredData; // Use computed property
      }
      const key = this.currentSortKey;
      const direction = this.currentSortDirection === 'asc' ? 1 : -1;

      // Create a shallow copy before sorting
      return [...this.filteredData].sort((a, b) => { // Use computed property
        const valA = this.getCellValue(a, key); // Use method
        const valB = this.getCellValue(b, key); // Use method

        if (valA < valB) return -1 * direction;
        if (valA > valB) return 1 * direction;
        return 0;
      });
    },

    // 3. Paginated Data
    totalPages() {
      return Math.ceil(this.sortedData.length / this.itemsPerPage); // Use computed property
    },

    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.sortedData.slice(start, end); // Use computed property
    },

    // Show controls if searching or pagination might be needed
    showControls() {
      return this.columns.some(c => c.searchable !== false) || this.totalPages > 1;
    }
  },

  methods: {
    // Helper to get potentially nested values
    getCellValue(obj, key) {
        // Guard against key being null/undefined if used unexpectedly
        if (key === null || typeof key === 'undefined') return undefined;
        return key.split('.').reduce((o, k) => (o || {})[k], obj);
    },

    sortBy(key) {
      if (this.currentSortKey === key) {
        if (this.currentSortDirection === 'asc') {
          this.currentSortDirection = 'desc';
        } else if (this.currentSortDirection === 'desc') {
          this.currentSortDirection = null;
          this.currentSortKey = null;
        } else {
           this.currentSortDirection = 'asc';
        }
      } else {
        this.currentSortKey = key;
        this.currentSortDirection = 'asc';
      }
      this.currentPage = 1; // Reset page
      this.$emit('update:sort', { key: this.currentSortKey, direction: this.currentSortDirection });
    },

    changePage(page) {
      if (page >= 1 && page <= this.totalPages) { // Use computed property
        this.currentPage = page;
        this.$emit('update:page', this.currentPage);
      }
    },

    onSearchInput() {
      this.currentPage = 1; // Reset page
    },

    getAriaSort(key) {
        if(this.currentSortKey !== key) return 'none';
        if(this.currentSortDirection === 'asc') return 'ascending';
        if(this.currentSortDirection === 'desc') return 'descending';
        return 'none';
    },

    onRowClick(row) {
        this.$emit('row:click', row);
    }
  },

  watch: {
    // Reset page if data changes externally and current page becomes invalid
    data: {
      handler() {
        if (this.currentPage > this.totalPages) {
            this.currentPage = Math.max(1, this.totalPages);
        }
      },
      deep: true // Necessary for watching changes within the array/objects
    },
    // Reset page if itemsPerPage changes and current page becomes invalid
    itemsPerPage() {
        if (this.currentPage > this.totalPages) {
            this.currentPage = Math.max(1, this.totalPages);
        }
    },
     // Watch props used for initial state if they need to override internal state later
     // (Often not strictly necessary if only used for initial setup in data())
     /*
     initialSortKey(newKey) {
         this.currentSortKey = newKey;
     },
     initialSortDirection(newDirection) {
         this.currentSortDirection = newDirection;
     }
     */
  }
};
</script>

<style scoped>
/* Styles remain exactly the same as the <script setup> version */
.multi-table-wrapper {
  font-family: sans-serif;
}

.table-controls {
  margin-bottom: 1rem;
}

.search-input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.table-container {
  overflow-x: auto; /* Allow horizontal scroll on small screens */
}

.multi-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
}

.multi-table th,
.multi-table td {
  padding: 0.8rem 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.multi-table th {
  background-color: #f8f8f8;
  font-weight: bold;
}

.multi-table th.sortable {
  cursor: pointer;
  user-select: none; /* Prevent text selection on click */
}
.multi-table th.sortable:hover {
    background-color: #f0f0f0;
}

.multi-table th .sort-icon {
    display: inline-block;
    width: 1em; /* Ensure consistent spacing */
    text-align: center;
    margin-left: 0.3em;
    color: #888;
}
.multi-table th.sorted .sort-icon {
    color: #333; /* Make active sort icon darker */
}


.multi-table tbody tr:hover {
  background-color: #f5f5f5;
}

.state-row td {
    text-align: center;
    color: #888;
    padding: 2rem;
}
.loading-state, .empty-state {
    font-style: italic;
}

.pagination-controls {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.pagination-controls button {
  padding: 0.5rem 1rem;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
}

.pagination-controls button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>