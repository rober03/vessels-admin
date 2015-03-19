package controllers

import play.api.libs.json.JsValue
import play.api.mvc.{Action, AnyContent}

/**
 * Created by roberto on 19/03/2015.
 */
trait VesselAbstractController {
  def vessels: Action[AnyContent]

  def vessel(id: String): Action[AnyContent]

  def deleteVessel(id: String): Action[JsValue]

  def editVessel(id:String): Action[JsValue]

  def newVessel: Action[JsValue]
}
