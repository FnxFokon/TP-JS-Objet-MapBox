const STORAGE_NAME = "tpjsobjetmapbox";

class LocalStorage {
  // Méthode pour charger le localStorage
  loadStorage() {
    let arrLocalEvts = [];
    const serializedData = localStorage.getItem(STORAGE_NAME);

    if (!serializedData) return arrLocalEvts;

    try {
      arrLocalEvts = JSON.parse(serializedData);
    } catch (error) {
      localStorage.removeItem(STORAGE_NAME);
    }
    return arrLocalEvts;
  }
  // Méthode pour sauvegarder les events dans le LocalStorage
  saveStorage(arrLocalEvts) {
    const serializedData = JSON.stringify(arrLocalEvts);

    try {
      localStorage.setItem(STORAGE_NAME, serializedData);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default LocalStorage;
