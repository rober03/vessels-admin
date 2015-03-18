package models

/**
 * A vessel is defined by a name, a width in meters, a length in meters, a draft in meters
 * (http://en.wikipedia.org/wiki/Draft_%28hull%29), the last coordinates it was seen at
 * (http://en.wikipedia.org/wiki/Geographic_coordinate_system).
 * Example JSON generated: {"id": "New", "width": 1,"length": 2, "draft": 3}
 */
case class Vessel ( id : String, width : Long, length : Long, draft: Long)

object JsonFormats {
  import play.api.libs.json.Json

  implicit val vesselFormat = Json.format[Vessel]
}
