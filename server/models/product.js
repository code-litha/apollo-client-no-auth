const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");
const { GraphQLError } = require("graphql");
const getCollection = () => {
  const db = getDatabase();
  const productCollection = db.collection("products");
  return productCollection;
};

const findAllProducts = async () => {
  // const products = await getCollection().find({}).toArray();
  const agg = [
    {
      $lookup: {
        from: "users",
        localField: "authorId",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: {
        path: "$author",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        "author.password": 0,
      },
    },
    {
      $sort: {
        stock: 1,
      },
    },
    // {
    //   $limit: 3,
    // },
  ];

  const products = await getCollection().aggregate(agg).toArray();

  return products;
};

const findOneProductById = async (id) => {
  const agg = [
    {
      $match: {
        _id: new ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "authorId",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: {
        path: "$author",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        "author.password": 0,
      },
    },
  ];

  const product = await getCollection().aggregate(agg).toArray();

  return product[0];
};

const createOneProduct = async (payload) => {
  let errorMessage = "";
  for (const key in payload) {
    if (!errorMessage && !payload[key] && payload[key] !== 0) {
      errorMessage = `${key} product can't be empty`;
    }
  }

  if (errorMessage) {
    throw new GraphQLError(errorMessage);
  }

  payload.imageUrls = [];
  payload.userId = new ObjectId(payload.userId);

  const productCollection = getCollection();
  const newProduct = await productCollection.insertOne(payload);

  const product = await productCollection.findOne({
    _id: newProduct.insertedId,
  });

  return product;
};

const updateOneProduct = async (id, payload) => {
  const productCollection = getCollection();

  await productCollection.updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: payload,
    }
  );

  const product = await productCollection.findOne({
    _id: new ObjectId(id),
  });

  return product;
};

const deleteOneProduct = async (id) => {
  const deleteProduct = await getCollection().deleteOne({
    _id: new ObjectId(id),
  });

  return deleteProduct;
};

const addImageProduct = async (id, imgUrl) => {
  const productCollection = getCollection();

  const updateProduct = await productCollection.updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      // $push: {
      //   imageUrls: {
      //     name: imgUrl,
      //   },
      // },
      $addToSet: {
        // untuk push yang unique
        imageUrls: {
          name: imgUrl,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    }
  );

  const product = await productCollection.findOne({
    _id: new ObjectId(id),
  });

  return product;
};

module.exports = {
  findAllProducts,
  findOneProductById,
  createOneProduct,
  updateOneProduct,
  deleteOneProduct,
  addImageProduct,
};
