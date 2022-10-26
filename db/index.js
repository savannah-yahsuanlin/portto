const Sequelize = require("sequelize");
const axios = require("axios");
const { STRING, INTEGER, TEXT } = Sequelize;

const conn = new Sequelize("postgres://localhost/portto");

const Asset = conn.define("asset", {
  id: {
    type: INTEGER,
    primaryKey: true,
  },
  name: {
    type: TEXT,
  },
  description: {
    type: TEXT,
  },
  permalink: {
    type: TEXT,
  },
  image_url: {
    type: STRING,
  },
  collectionName: {
    type: STRING,
  },
});

const seed = async () => {
  await conn.sync({ force: true });

  console.log("db synced!");

  const response = (
    await axios.get(
      "https://testnets-api.opensea.io/api/v1/assets?owner=0x5f5dadcbBC522845212C44D63152246eBF1Ea2AB&order_direction=desc&offset=20&limit=20"
    )
  ).data.assets;
  const assetData = [];

  for (let i = 0; i < response.length; i++) {
    assetData.push(
      Asset.create({
        id: `${response[i].id}`,
        name: `${response[i].name}`,
        description: `${response[i].description}`,
        permalink: `${response[i].permalink}`,
        image_url: `${
          response[i].image_url === null
            ? "https://img.freepik.com/free-vector/coming-soon-construction-illustration-design_1017-31445.jpg?w=1800&t=st=1666712519~exp=1666713119~hmac=8949b5e3072a2f878910be99615e0e0216e7e3aaf7b16900e623243a964dd7ef"
            : response[i].image_url
        }`,
        collectionName: `${response[i].collection.name}`,
      })
    );
  }

  console.log(`seed ${assetData.length} assets`);

  return {
    assetData,
  };
};

module.exports = {
  conn,
  seed,
  Asset,
};
