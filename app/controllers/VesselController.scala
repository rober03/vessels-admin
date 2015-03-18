package controllers

import models.Vessel
import play.api._
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json._
import play.api.mvc._
import scala.concurrent.Future
import play.modules.reactivemongo.MongoController
import play.modules.reactivemongo.json.collection.JSONCollection


/**
 * Created by roberto on 13/03/2015.
 */
object VesselController extends Controller with MongoController {
  import models.JsonFormats._

  def collection: JSONCollection = db.collection[JSONCollection]("vessels")

  def vessels = getVessel(Json.obj())

  def vessel(id: String) = getVessel(Json.obj("id" -> id))

  def getVessel(objectToFind : JsObject)=  Action.async {
    val query = collection.find(objectToFind).cursor[JsObject]
    query.collect[List]().map (persons => Json.arr(persons)).map(Ok(_))
  }

  def deleteVessel(id: String) = Action.async {
    collection.remove(Json.obj("id" -> id)).map { lastError  =>
      Logger.info(s"Successfully inserted with LastError: $lastError")
      Ok("Vessel delete")
    }
  }

  def editVessel(width: String, length: String, draft: String) = Action.async(parse.json) {request =>
    //TODO: make a real update

    request.body.validate[Vessel].map { vessel =>
      val vesselEditMapper = Json.obj("width" -> width, "length" -> length, "draft" -> draft)

      collection.update(vesselEditMapper,vessel).map { lastError =>
        Logger.info(s"Successfully update with LastError: $lastError")
        Created("Vessel Update")
      }
    }.getOrElse(Future.successful(BadRequest("invalid json")))
  }

  def newVessel = Action.async(parse.json) {request =>
    request.body.validate[Vessel].map { result =>
      collection.insert(result).map { lastError =>
        Logger.info(s"Successfully inserted with LastError: $lastError")
        Created("Vessel Created")
      }
    }.getOrElse(Future.successful(BadRequest("invalid json")))
  }
}
