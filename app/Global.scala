import com.google.inject.{AbstractModule, Guice}
import controllers.{VesselAbstractController, VesselMongoController}
import play.api.GlobalSettings

/**
 * Created by roberto on 19/03/2015.
 */
object Global extends GlobalSettings {

  /**
   * Configuring our dependencies
   */
  val injector = Guice.createInjector(new AbstractModule {
    protected def configure() {
      // VesselAbstractController <- VesselMongoController
      bind(classOf[VesselAbstractController]).to(classOf[VesselMongoController])
    }
  })

  /**
   * Overriding the default play´s injector
   */
  override def getControllerInstance[A](controllerClass: Class[A]): A = injector.getInstance(controllerClass)
}

