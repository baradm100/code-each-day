const readline = require("readline");
const BUILDING_STACK_SIZE = 50;
const NUMBER_OF_BUILDINGS = 30;
const DEFAULT_BUILDINGS =
  "101,87,122,208,74,107,152,130,131,129,1,8,200,201,99,101,55,78,56,59,36,101,88,300,89,98,1000,50,100,1";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Stack {
  #EMPTY_STACK = -1;
  #_arr;
  #_size;
  #_head;

  constructor(size) {
    this.#_arr = new Array(size);
    this.#_size = size;
    this.#_head = this.#EMPTY_STACK;
  }

  pop() {
    if (this.#_head < 0) {
      throw new Error("Underflow");
    }

    delete this.#_arr[this.#_head];

    this.#_head--;
  }

  push(newValue) {
    if (this.#_head === this.#_size - 1) {
      throw new Error("Overflow");
    }

    this.#_head++;

    this.#_arr[this.#_head] = newValue;
  }

  top() {
    return this.#_arr[this.#_head];
  }

  isEmpty() {
    return this.#_head === this.#EMPTY_STACK;
  }

  toString() {
    const joinedArray = this.#_arr.join(", ").trim();
    return `[${joinedArray.substring(0, joinedArray.length - 1)}]`;
  }
}

/**
 * Input function: Get buildings from user input
 *
 * @returns {Number[]}
 */
const populateBuildings = () => {
  return new Promise((res, rej) => {
    rl.question(
      `Please insert ${NUMBER_OF_BUILDINGS} buildings (between each building use: ",") [PRESS ENTER FOR DEFAULT]: `,
      (dirtyBuildings) => {
        rl.close();
        const buildingsToParse = dirtyBuildings.trim() || DEFAULT_BUILDINGS;

        // Converting the input to numbers array
        const buildings = buildingsToParse
          .trim()
          .split(",")
          .map((b) => parseInt(b.trim(), 10));

        // Validation
        if (buildings.some((b) => isNaN(b))) {
          rej(new Error("Bad input"));
        } else if (buildings.length !== NUMBER_OF_BUILDINGS) {
          rej(
            new Error(
              `Missing buildings, expected: ${NUMBER_OF_BUILDINGS}, got: ${buildings.length}`
            )
          );
        } else {
          res(buildings);
        }
      }
    );
  });
};

/**
 * Helper function: Print array, one item at a time
 * Time Complexity: O(n)
 *
 * @param {Number[]} arr array to print
 */
const printArray = (arr) => {
  for (const item of arr) {
    console.log(item);
  }
};

/**
 * Preform the search for blocking view buildings
 * Time Complexity: O(n)
 */
const main = async () => {
  // Input example: 101,87,122,208,74,107,152,130,131,129,1,8,200,201,99,101,55,78,56,59,36,101,88,300,89,98,1000,50,100,1
  const buildings = await populateBuildings(); // Complexity: O(n)
  const reveredBuildings = buildings.reverse(); // Complexity: O(n)
  const answer = new Array(NUMBER_OF_BUILDINGS).fill(0); // Complexity: O(n)
  const prevBlockingBuildingsIndex = new Stack(BUILDING_STACK_SIZE);

  // Setting the first building from the sea to be the first blocking building
  prevBlockingBuildingsIndex.push(0);

  // The `for` + `while` complexity: O(2n) -> O(n)
  // Why? At the worst case we'll scan the whole an array with 1 value and then the whole stack full (or vice-versa), meaning O(2*n) -> O(n)
  for (let i = 1; i < NUMBER_OF_BUILDINGS; i++) {
    while (
      !prevBlockingBuildingsIndex.isEmpty() &&
      reveredBuildings[i] > reveredBuildings[prevBlockingBuildingsIndex.top()]
    ) {
      // Found blocking building! Updating the answer array
      answer[NUMBER_OF_BUILDINGS - prevBlockingBuildingsIndex.top() - 1] =
        NUMBER_OF_BUILDINGS - i;
      prevBlockingBuildingsIndex.pop();
    }

    // Adding the current building to the stack
    prevBlockingBuildingsIndex.push(i);
  }

  printArray(answer); // Complexity: O(n)
};

main();
