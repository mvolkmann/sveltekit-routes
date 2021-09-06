export type Dog = {
  name: string;
  breed: string;
};

export type Person = {
  name: string;
  dogs: {[dogId: string]: Dog};
};
