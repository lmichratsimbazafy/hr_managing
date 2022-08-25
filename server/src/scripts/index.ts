import { seedAdminUser } from './seedAdminUsesr';

console.log('Seed Running ...', '🚀');

const executeSeed = async (): Promise<void> => {
  Promise.all([seedAdminUser()]);
};

executeSeed();
