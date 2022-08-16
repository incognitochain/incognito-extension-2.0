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
      return {
        ...state,
        nameTmp: Math.random().toFixed(2),
        people: undefined,
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
