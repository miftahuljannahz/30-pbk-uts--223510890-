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
            <button @click="editActivity(activity)">Edit</button>
            <button @click="deleteActivity(activity)">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>
    <form @submit.prevent="saveActivity">
      <input v-model="newActivity" type="text" placeholder="Tambahkan atau edit kegiatan" />
      <button type="submit">
        <span v-if="isLoading" class="loader"></span>
        <span v-else>{{ editMode ? 'Simpan' : 'Tambah' }}</span>
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
      isLoading: false,
      editMode: false,
      activityToEdit: null
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
    async saveActivity() {
      if (this.newActivity.trim() !== '') {
        this.isLoading = true;
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (this.editMode) {
          this.activityToEdit.title = this.newActivity;
          this.editMode = false;
          this.activityToEdit = null;
        } else {
          const newId = this.activities.length > 0 ? this.activities[this.activities.length - 1].id + 1 : 1;
          this.activities.push({
            id: newId,
            title: this.newActivity,
            completed: false
          });
        }
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
    editActivity(activity) {
      this.newActivity = activity.title;
      this.editMode = true;
      this.activityToEdit = activity;
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
  color: #ffffff;
  margin-bottom: 20px;
  text-align: center;
}

table {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  border: 1px solid #000000;
}

th {
  background-color: #3D2C1B;
  color: #fff;
}

td {
  background-color: #f9f9f9;
}

tr:nth-child(even) td {
  background-color: #f1f1f1;
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
  width: 300px;
}

button {
  padding: 8px 16px; /* Perbesar padding horizontal untuk tombol */
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #D2B48C;
  color: white;
  cursor: pointer;
  position: relative;
  margin: 4px; /* Tambahkan margin untuk memberikan jarak antara tombol */
}

button:hover {
  background-color: #3D2C1B;
}

.button-container {
  display: flex;
  justify-content: space-around; /* Atur jarak antara tombol agar rapi */
}

button .loader {
  border: 3px solid #f3f3f3;
  border-radius: 50%;
  border-top: 3px solid #3D2C1B;
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

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-image: url('https://i.pinimg.com/564x/5c/f8/93/5cf89309a937d6ec7d4267ae5531c858.jpg');
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.container::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  z-index: -1;
  pointer-events: none;
}

.activity {
  margin-bottom: 10px;
}

.activity-number {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background-color: #3c4249;
  color: #fff;
  margin-right: 10px;
  border-radius: 50%;
}

.completed {
  text-decoration: line-through;
  color: #888;
}

form {
  margin-bottom: 20px;
  text-align: center;
}

input[type="text"] {
  padding: 8px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #191515;
}

input[type="text"]:focus {
  outline: none;
  border-color: #3c4249;
}

.checkbox-label {
  font-size: 14px;
  display: inline-block;
  margin-right: 5px;
}

.checkbox {
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}

.checkbox:checked + .checkbox-label::before {
  content: "\2713";
  display: inline-block;
  margin-right: 5px;
  font-size: 14px;
}

.checkbox-label::before {
  content: "\2610";
  display: inline-block;
  margin-right: 5px;
  font-size: 14px;
}

.checkbox:checked + .checkbox-label {
  color: #0056b3;
}

.footer {
  text-align: center;
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #ddd;
  color: #888;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #bcc7c5;
  padding: 20px;
  text-align: center;
}

.footerHover {
  transform: scale(1.1);
  transition: transform 0.3s;
}

@keyframes animate {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
