import play.PlayScala

name := """vessels-admin"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.1"

libraryDependencies ++= Seq(
  "org.reactivemongo" %% "play2-reactivemongo" % "0.10.5.0.akka23",
  "org.webjars" % "bootstrap" % "3.3.2-2",
  "org.webjars" % "angularjs" % "1.3.14",
  "org.webjars" % "angular-ui-bootstrap" % "0.12.1-1"
)
