import sharp, { Sharp } from "sharp";

import Hash from "ipfs-only-hash";
import { fileURLToPath } from "url";
import fs from "fs";

const eyes = fs
  .readdirSync("./layers/eyes")
  .map((file) => file.replace(".png", ""));
const mouths = fs
  .readdirSync("./layers/mouths")
  .map((file) => file.replace(".png", ""));
const hats = fs
  .readdirSync("./layers/hats")
  .map((file) => file.replace(".png", ""));
const base = "./layers/faces/base.png";

type Info = {
  meta: {
    eye: string;
    mouth: string;
    hat: string;
  };
  img: sharp.Sharp;
};

const comp = (eye: string, mouth: string, hat: string): sharp.Sharp => {
  const eyePath = `./layers/eyes/${eye}.png`;
  const mouthPath = `./layers/mouths/${mouth}.png`;
  const hatPath = `./layers/hats/${hat}.png`;

  return sharp(base)
    .composite([
      { input: eyePath, gravity: "center" },
      { input: mouthPath, gravity: "center" },
      { input: hatPath, gravity: "center" },
    ])
    .png();
};

const infos: Info[] = [];

eyes.forEach((eye) => {
  mouths.forEach((mouth) => {
    hats.forEach((hat) => {
      infos.push({
        meta: {
          eye,
          mouth,
          hat,
        },
        img: comp(eye, mouth, hat),
      });
    });
  });
});

const shuffled = infos.sort(() => Math.random() - 0.5);
shuffled.forEach(async (info, i) => {
  const { meta, img } = info;
  await img.toFile(`output/img/${i}.png`);

  const json = {
    name: `${meta.eye}-eyed ${meta.hat}-wearing ${meta.mouth}-mouth vidhan`,
    image: `ipfs://${await Hash.of(fs.readFileSync(`output/img/${i}.png`), {
      cidVersion: 1,
    })}`,
    attributes: [
      {
        trait_type: "Eyes",
        value: meta.eye,
      },
      {
        trait_type: "Mouth",
        value: meta.mouth,
      },
      {
        trait_type: "Hat",
        value: meta.hat,
      },
    ],
  };

  fs.writeFileSync(`./output/metadata/${i}`, JSON.stringify(json, null, 2));
});
