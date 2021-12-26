import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Post from "App/Models/Post";
import { schema } from "@ioc:Adonis/Core/Validator";
import { enumStatus } from "App/Enums/Status";

export default class PostsController {
  async index({ response }: HttpContextContract) {
    const model = await Post.all();
    return model == null ? response.json([]) : response.json(model);
  }

  async store({ request, response }: HttpContextContract) {
    const payloadData = {
      schema: schema.create({
        title: schema.string(),
        description: schema.string(),
        status: schema.enum(Object.values(enumStatus)),
      }),
      messages: {
        required: "The {{ field }} must required",
      },
    };

    const reqValidate = await request.validate(payloadData);

    const model = new Post();
    (model.title = reqValidate.title),
      (model.description = reqValidate.description);
    model.status = reqValidate.status;

    const saveModel = await model.save();

    return saveModel.$isPersisted == false
      ? response.json({ status: "Fail Save" })
      : response.json({ status: "Success Save" });
  }

  async show({ response, params }: HttpContextContract) {
    let { id } = params;
    const model = await Post.find(id);
    if (id == "") {
      return response.json({ model: {} });
    }
    return response.json(model);
  }

  async update({ params, response, request }: HttpContextContract) {
    const payloadData = await request.validate({
      schema: schema.create({
        title: schema.string(),
        description: schema.string(),
        status: schema.enum(Object.values(enumStatus)),
      }),
      messages: {
        required: "The {{ field }} must required",
      },
    });

    const { id } = params;

    const model = await Post.findOrFail(id);
    model.title = payloadData.title;
    model.description = payloadData.description;
    model.status = payloadData.status;

    const saveModel = await model.save();

    return saveModel.$isPersisted == false
      ? response.json({ status: "Fail Update" })
      : response.json({ status: "Success Update" });
  }

  async delete({ params }) {
    const { id } = params;
    const model = await Post.findOrFail(id);
    await model.delete();
  }
}
