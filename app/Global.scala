import com.google.inject.{AbstractModule, Guice}
import controllers.{VesselAbstractController, VesselMongoController}
import play.api.GlobalSettings

/**
 * Created by roberto on 19/03/2015.
 */
object Global extends GlobalSettings {

  val injector = Guice.createInjector(new AbstractModule {

    protected def configure() {
      bind(classOf[VesselAbstractController]).to(classOf[VesselMongoController])
    }
  })

  /**
   * Controllers must be resolved through the application context. There is a special method of GlobalSettings
   * that we can override to resolve a given controller. This resolution is required by the Play router.
   */
  override def getControllerInstance[A](controllerClass: Class[A]): A = injector.getInstance(controllerClass)
}

