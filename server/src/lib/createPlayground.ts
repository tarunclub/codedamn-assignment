import { exec } from "child_process";
// tarunclub/tensor-react-playground-env:1.0.0

export function createPlayground(
  port: number,
  name: string,
  imageName: string,
) {
  return new Promise((resolve) => {
    const child = exec(
      `docker run -d -p ${port}:${port} -p 5001:5001 --name ${name} ${imageName}`,
    );

    child.stdout?.on("data", function (data) {
      console.log(data);
    });
    child.stderr?.on("data", function (data) {
      console.error(data);
    });

    child.on("close", function (code) {
      resolve("");
    });
  });
}
