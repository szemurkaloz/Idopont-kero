//köv
interface TabelProps {
  items: { id: string }[];
  rendereItem: (item: { id: string }) => React.ReactNode;
}

export const Table = (props: TabelProps) => {
  return null;
};

type Props = {};

export const Component = () => {
  return (
    <Table
      items={[{ id: "1" }]}
      rendereItem={(item) => {
        return null;
      }}
    ></Table>
  );
};
/* 
//Megoldás
interface TabelProps<TItem> {
  items: TItem[];
  rendereItem: (item: TItem) => React.ReactNode;
}

export const Table = <TItem,>(props: TabelProps<TItem>) => {
  return null;
};

type Props = {};

export const Component = () => {
  return (
    <Table
      items={[{ id: "1" }]}
      rendereItem={(item) => {
        return null;
      }}
    ></Table>
  );
};
 */
//Köv

export const getDeepValue = (obj: any, firstKey: string, secondKey: string) => {
  return obj[firstKey][secondKey];
};

const obj = {
  foo: {
    a: true,
    b: 2,
  },
  bar: {
    c: "12",
    d: 18,
  },
};

const value = getDeepValue(obj, "foo", "a");
/*
export const getDeepValue = <TObj,TFirstKey extends keyof TObj, TSecondKey extends keyof TObj[TFirstKey]>(obj: TObj, firstKey: TFirstKey, secondKey: TSecondKey) => {
  return obj[firstKey][secondKey];
};

const obj = {
  foo: {
    a: true,
    b: 2,
  },
  bar: {
    c: "12",
    d: 18,
  },
};

const value = getDeepValue(obj, "foo", "a");
*/
//köv
/* 

type Animal = {
  name: string;
};

type Human = {
  firstName: string;
  secondName: string;
};

type GetRequiredInformation<TType> = any;

export type GetRequiredInformationFromAnimal = GetRequiredInformation<Animal>;

export type GetRequiredInformationFromHuman = GetRequiredInformation<Human>;
 */
//Megoldás
type Animal = {
  name: string;
};

type Human = {
  firstName: string;
  secondName: string;
};

type GetRequiredInformation<TType> = TType extends Animal
  ? { age: number }
  : { SocialSecurityNumber: number };

export type GetRequiredInformationFromAnimal = GetRequiredInformation<Animal>;

export type GetRequiredInformationFromHuman = GetRequiredInformation<Human>;
//köv
interface Lengthwise {
  length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}

//loggingIdentity(3);
loggingIdentity([3]);
loggingIdentity({ value: 3, length: 10 });
//köv
export const deepEqualCompare = <Arg,>(
  a: Arg extends any[] ? `Don't pass an array!` : Arg,
  b: Arg
): boolean => {
  /*
    if(Array.isArray(a)) || Array.isArray(b){
        throw new Error("You cannot compare toww arrays using deepEqualCompare")
    }*/
  return a === b;
};
