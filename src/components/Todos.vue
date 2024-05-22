<template>
  <div class="container" :class="{ 'fadeIn': fadeIn, 'fadeOut': fadeOut }">
    <h1>Daftar Kegiatan</h1>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Kegiatan</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(activity, index) in filteredActivities" :key="activity.id">
          <td>{{ index + 1 }}</td>
          <td>
            <span :class="{ 'completed': activity.completed }">{{ activity.title }}</span>
          </td>
          <td>
            <span v-if="activity.completed" class="completed">Selesai</span>
            <span v-else>Belum Selesai</span>
          </td>
          <td>
            <button @click="toggleCompletion(activity)">
              {{ activity.completed ? 'Batal Checklist' : 'Checklist' }}
            </button>
            <button @click="deleteActivity(activity)">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>
    <form @submit.prevent="addActivity">
      <input v-model="newActivity" type="text" placeholder="Tambahkan kegiatan" />
      <button type="submit">
        <span v-if="isLoading" class="loader"></span>
        <span v-else>Tambah</span>
      </button>
    </form>
    <label>
      <input type="checkbox" v-model="showOnlyIncomplete" />
      Tampilkan yang Belum Selesai
    </label>
    <slot></slot>
    <div class="additional-content">
      <slot name="additional"></slot>
    </div>
  </div>

  <footer class="footer" @mouseover="footerHover">
    <slot name="footerContent">Miftahul Jannah | 223510890 | 4D</slot> 
  </footer>
</template>

<script>
export default {
  props: {
    initialActivities: {
      type: Array,
      default: () => []
    },
    additionalContent: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      activities: [],
      newActivity: '',
      showOnlyIncomplete: false,
      fadeIn: false,
      fadeOut: false,
      isLoading: false 
    };
  },
  created() {
    const savedActivities = localStorage.getItem('activities');
    if (savedActivities) {
      this.activities = JSON.parse(savedActivities);
    } else {
      this.activities = this.initialActivities;
    }
  },
  watch: {
    activities: {
      handler: function(activities) {
        localStorage.setItem('activities', JSON.stringify(activities));
      },
      deep: true
    }
  },
  computed: {
    filteredActivities() {
      if (this.showOnlyIncomplete) {
        return this.activities.filter(activity => !activity.completed);
      }
      return this.activities;
    }
  },
  methods: {
    async addActivity() {
      if (this.newActivity.trim() !== '') {
        this.isLoading = true; 
        await new Promise(resolve => setTimeout(resolve, 1000));
        const newId = this.activities.length > 0 ? this.activities[this.activities.length - 1].id + 1 : 1;
        this.activities.push({
          id: newId,
          title: this.newActivity,
          completed: false
        });
        this.newActivity = '';
        this.isLoading = false; 

        this.fadeIn = true;
        setTimeout(() => {
          this.fadeIn = false;
        }, 1000);
      }
    },
    deleteActivity(activity) {
      const index = this.activities.indexOf(activity);
      if (index !== -1) {
        this.activities.splice(index, 1);

        this.fadeOut = true;
        setTimeout(() => {
          this.fadeOut = false;
        }, 1000);
      }
    },
    toggleCompletion(activity) {
      activity.completed = !activity.completed;
      const span = document.querySelector('.container');
      span.classList.add('animate');
      setTimeout(() => {
        span.classList.remove('animate');
      }, 1000);
    },
    footerHover() {
      const footer = document.querySelector('.footer');
      footer.classList.add('footerHover');
      setTimeout(() => {
        footer.classList.remove('footerHover');
      }, 500);
    }
  }
};
</script>

<style scoped>
.container {
  transition: opacity 0.5s ease;
}

.container.fadeIn {
  opacity: 1;
}

.container.fadeOut {
  opacity: 0;
}

h1 {
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

table {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.completed {
  text-decoration: line-through;
  color: #27ae60;
}

form {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

input[type="text"] {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #3498db;
  color: white;
  cursor: pointer;
  position: relative;
}

button:hover {
  background-color: #2980b9;
}

button .loader {
  border: 3px solid #f3f3f3;
  border-radius: 50%;
  border-top: 3px solid #3498db;
  width: 14px;
  height: 14px;
  animation: spin 2s linear infinite;
  display: inline-block;
  vertical-align: middle;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

label {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}

.footer {
  text-align: center;
  padding: 10px 0;
  background-color: #f1f1f1;
  transition: background-color 0.5s ease;
}

.footer.footerHover {
  background-color: #3498db;
  color: white;
}

.additional-content {
  margin-top: 20px;
}

</style>
