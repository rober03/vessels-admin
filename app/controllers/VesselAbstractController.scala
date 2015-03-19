package controllers

import play.api.libs.json.JsValue
import play.api.mvc.{AnyContent, Action, Controller}

/**
 * Created by roberto on 19/03/2015.
 */
abstract class VesselAbstractController extends Controller {
  def vessels: Action[AnyContent]

  def vessel(id: String): Action[AnyContent]

  def deleteVessel(id: String): Action[JsValue]

  def editVessel(id:String): Action[JsValue]

  def newVessel: Action[JsValue]
}
