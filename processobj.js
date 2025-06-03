console.log("Process ID:", process.pid);
console.log("Command-line arguments:", process.argv);

const args = process.argv.slice(2);
args.forEach((arg, index) => {
  console.log(`Argument ${index + 1}: ${arg}`);
});