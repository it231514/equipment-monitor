import Equipment, {
  EquipmentEssentialsList,
  EquipmentList,
  NewEquipment,
  Sensor,
  SensorList,
  UpdateEquipment,
  UpdateSensor,
} from "./equipment.interface";
import TestImageBase64 from "./list/testimage";

// TODO REPLACE FUNCTIONS WITH FETCHES FROM SERVER

/** Equipment Service. This class may not be instantiated or extended */
export default abstract class ItemService {
  private constructor() {} // This class should not be instantiated

  private static sensorList: SensorList = [
    {
      id: crypto.randomUUID(),
      type: "temperature",
      serialNr: "45786947896",
      operatingHours: 3453,
      mileage: 5675,
      value: 23.5,
    },
    {
      id: crypto.randomUUID(),
      type: "temperature",
      serialNr: "45786947896",
      operatingHours: 3453,
      mileage: 5675,
      value: 26.5,
    },
    {
      id: crypto.randomUUID(),
      type: "temperature",
      serialNr: "45786947896",
      operatingHours: 3453,
      mileage: 5675,
      value: 23.5,
    },
    {
      id: crypto.randomUUID(),
      type: "temperature",
      serialNr: "45786947896",
      operatingHours: 3453,
      mileage: 5675,
      value: 26.5,
    },
    {
      id: crypto.randomUUID(),
      type: "temperature",
      serialNr: "45786947896",
      operatingHours: 3453,
      mileage: 5675,
      value: 23.5,
    },
    {
      id: crypto.randomUUID(),
      type: "temperature",
      serialNr: "45786947896",
      operatingHours: 3453,
      mileage: 5675,
      value: 26.5,
    },
  ];
  private static equipmentList: EquipmentList = [
    {
      id: crypto.randomUUID(),
      image: TestImageBase64,
      serialNr: "H6444",
      articleNr: "5674373423",
      manufacturer: "Some Random Chinese Dude",
      description: "Stapler",
      location: "Versandlager",
      locationPrecise: "Versandlager 1",
      chairperson: "Mr. Mustermann Max",
      lastInspection: new Date(),
      nextInspection: new Date(),
      sensors: this.sensorList.map((sensor) => sensor.id),
    },
    {
      id: crypto.randomUUID(),
      image: null,
      serialNr: "DF543",
      articleNr: "5475322",
      manufacturer: "Some Random Brasilian Dude",
      description: "Putzmaschine",
      location: "Besenkammer",
      locationPrecise: "Besenkammer Obergeschoß",
      chairperson: "Mr. Mustermann Max",
      lastInspection: new Date(),
      nextInspection: new Date(),
      sensors: [this.sensorList[3].id, this.sensorList[4].id],
    },
    {
      id: crypto.randomUUID(),
      image: null,
      serialNr: "IO474573",
      articleNr: "2702446",
      manufacturer: "Some Random English Dude",
      description: "Laptop",
      location: "Büro",
      locationPrecise: "Chefbüro",
      chairperson: "Mr. Mustermann Max",
      lastInspection: new Date(),
      nextInspection: new Date(),
      sensors: [],
    },
  ];

  public static async getEqipment(
    id: string | number
  ): Promise<Equipment | undefined> {
    return this.equipmentList.find((equipment) => equipment.id === id);
  }

  public static async getEquipmentList(): Promise<EquipmentList> {
    return this.equipmentList;
  }

  public static async getEquipmentEssentialsList(): Promise<EquipmentEssentialsList> {
    return this.equipmentList.map((equipment) => ({
      id: equipment.id,
      serialNr: equipment.serialNr,
      description: equipment.description,
      location: equipment.location,
    }));
  }

  public static async deleteEquipment(id: number | string): Promise<boolean> {
    this.equipmentList = this.equipmentList.filter(
      (equipment) => equipment.id !== id
    );

    return true;
  }

  public static async addEquipment(equipment: NewEquipment): Promise<boolean> {
    const newEquipment = { ...equipment, id: crypto.randomUUID() };
    this.equipmentList.push(newEquipment);

    return true;
  }

  public static async updateEquipment(
    id: string | number,
    updateItems: UpdateEquipment
  ): Promise<boolean> {
    const index = this.equipmentList.findIndex(
      (equipment) => equipment.id === id
    );

    this.equipmentList[index] = {
      ...this.equipmentList[index],
      ...updateItems,
    };

    return true;
  }

  public static async getSensorList(): Promise<SensorList> {
    return this.sensorList;
  }

  public static async getSensor(id: string): Promise<Sensor | undefined> {
    return this.sensorList.find((sensor) => sensor.id === id);
  }

  public static async addSensor(sensor: Sensor): Promise<boolean> {
    this.sensorList.push(sensor);

    return true;
  }

  public static async deleteSensor(id: string): Promise<boolean> {
    this.sensorList = this.sensorList.filter((sensor) => sensor.id !== id);

    return true;
  }

  public static async updateSensor(
    id: string,
    sensor: UpdateSensor
  ): Promise<boolean> {
    const index = this.sensorList.findIndex((sensor) => sensor.id === id);
    this.sensorList[index] = { ...this.sensorList[index], ...sensor };

    return true;
  }
}
