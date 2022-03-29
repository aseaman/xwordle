import Key from "./Key";

export default () => (
  <div>
    <div class="flex justify-center mb-2">
      {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
        <Key value={key} />
      ))}
    </div>
    <div class="flex justify-center mb-2">
      {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
        <Key value={key} />
      ))}
    </div>
    <div class="flex justify-center mb-2">
      <Key value="ENTER" width={66}>
        ENTER
      </Key>
      {["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
        <Key value={key} />
      ))}
      <Key value="DELETE" width={66}>
        DELETE
      </Key>
    </div>
  </div>
);
