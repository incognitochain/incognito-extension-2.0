export class People {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  changeName() {
    return this.name + "ABCDE";
  }
}

export interface Test {
  nameTmp?: string;
  people?: People;
  data?: {
    abc: {
      a: string;
      b: string;
    };
    hehe: string;
  };
}

const initialState: Test = {
  nameTmp: "1",
  people: undefined,
  data: {
    abc: {
      a: "2",
      b: "3",
    },
    hehe: "4",
  },
};

export const reducer = (state: Test = initialState, action: any = {}): Test => {
  switch (action.type) {
    case "TEST_MODEL": {
      const newP = new People(Math.random().toFixed(4).toString());
      newP.getName();
      console.log("newP ", newP);
      console.log("change ", newP.changeName());
      return {
        ...state,
        nameTmp: Math.random().toFixed(2),
        people: newP,
        data: {
          abc: {
            a: Math.random().toFixed(2),
            b: Math.random().toFixed(2),
          },
          hehe: Math.random().toFixed(2),
        },
      };
    }
    default:
      return state;
  }
};
