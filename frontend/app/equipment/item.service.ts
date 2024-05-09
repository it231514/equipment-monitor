import Equipment, {
  EquipmentEssentialsList,
  EquipmentList,
  NewEquipment,
  UpdateEquipment,
} from "./equipment.interface";
import TestImageBase64 from "./list/testimage";

// TODO REPLACE FUNCTIONS WITH FETCHES FROM SERVER

/** Equipment Service. This class may not be instantiated or extended */
export default abstract class ItemService {
  private constructor() {} // This class should not be instantiated

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
      sensors: [
        {
          id: "fgjj9e",
          type: "temperature",
          serialNr: "45786947896",
          operatingHours: 3453,
          mileage: 5675,
          temperature: 23.5,
        },
        {
          id: "fgjjsds9e",
          type: "temperature",
          serialNr: "45786947896",
          operatingHours: 3453,
          mileage: 5675,
          temperature: 26.5,
        },
        {
          id: "fgjj9e",
          type: "temperature",
          serialNr: "45786947896",
          operatingHours: 3453,
          mileage: 5675,
          temperature: 23.5,
        },
        {
          id: "fgjjsds9e",
          type: "temperature",
          serialNr: "45786947896",
          operatingHours: 3453,
          mileage: 5675,
          temperature: 26.5,
        },
        {
          id: "fgjj9e",
          type: "temperature",
          serialNr: "45786947896",
          operatingHours: 3453,
          mileage: 5675,
          temperature: 23.5,
        },
        {
          id: "fgjjsds9e",
          type: "temperature",
          serialNr: "45786947896",
          operatingHours: 3453,
          mileage: 5675,
          temperature: 26.5,
        },
      ],
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
      sensors: [
        {
          id: "fgjj9e",
          type: "temperature",
          serialNr: "45786947896",
          operatingHours: 3453,
          mileage: 5675,
          temperature: 23.5,
        },
      ],
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

  public static async deleteEquipment(id: number): Promise<boolean> {
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
}
