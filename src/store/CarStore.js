import { makeObservable, observable, action, runInAction } from 'mobx';
import axios from 'axios';

class CarStore {
  cars = [];
  featuredCars = [];
  loading = false;
  error = null;

  constructor() {
    makeObservable(this, {
      cars: observable,
      featuredCars: observable,
      loading: observable,
      error: observable,
      fetchCars: action,
      fetchFeaturedCars: action
    });
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  initializeSampleData = () => {
    this.featuredCars = [
      {
        id: '1',
        brand: 'BMW',
        model: 'X5',
        image: 'https://images.pexels.com/photos/7762700/pexels-photo-7762700.jpeg',
        price: '₹99.90 Lakh - ₹1.13 Crore',
        specs: {
          engine: '2998 cc',
          power: '335 bhp',
          mileage: '11.2 kmpl',
          transmission: 'Automatic',
        }
      },
      {
        id: '2',
        brand: 'Mercedes',
        model: 'E-Class',
        image: 'https://images.pexels.com/photos/12170317/pexels-photo-12170317.jpeg',
        price: '₹76 Lakh - ₹89 Lakh',
        specs: {
          engine: '1991 cc',
          power: '194 bhp',
          mileage: '16.1 kmpl',
          transmission: 'Automatic',
        }
      }
    ];
    
    this.cars = [...this.featuredCars];
  }

  fetchCars = async () => {
    this.loading = true;
    this.error = null;
    
    try {
      // In a real app, you would fetch from an API
      // const response = await axios.get('https://api.example.com/cars');
      // runInAction(() => {
      //   this.cars = response.data;
      //   this.loading = false;
      // });
      
      // Using sample data instead
      setTimeout(() => {
        runInAction(() => {
          this.loading = false;
        });
      }, 500);
    } catch (error) {
      runInAction(() => {
        this.error = error.message;
        this.loading = false;
      });
    }
  }

  fetchFeaturedCars = async () => {
    // Similar implementation as fetchCars
    // In a real app, you would fetch featured cars from an API
  }
}

const carStore = new CarStore();
export default carStore;