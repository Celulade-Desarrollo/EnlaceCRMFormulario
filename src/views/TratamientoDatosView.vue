<script setup>
import Heading from "../components/UI/Heading.vue";
import Footer from "../components/UI/Footer.vue";
import { fadeInUp } from "../motion/PagesAnimation";
import { motion } from "motion-v";
</script>

<template>
  <Heading />

  <motion.div v-bind="fadeInUp">
    <section class="container terminos-container">

      <h2 class="titulo-7 text-center mb-6 text-2xl font-bold">
        Términos y Condiciones Piloto Tenderos
      </h2>

      <p>
        El presente documento establece los Términos y Condiciones
         aplicables al acceso, otorgamiento, utilización, administración, recaudo, cobranza, 
         restricciones, responsabilidades y demás disposiciones jurídicas que regulan el Crédito Rotativo
        para Tenderos (en adelante, el “Crédito”) en el escenario de una prueba piloto del Crédito que se 
        desarrollará entre 15 de febrero y el 30 de septiembre del 2026, otorgado por Banco W S.A. (en adelante, el “Banco”).
      </p>

      <h3>1. Definiciones</h3>

      <P>Para efectos del presente documento se desglosan las siguientes definiciones:</P>

      <p>
        <strong>1.1 App Enlace Fiado:</strong> aplicación móvil desarrollada y operada por
        myAllSupport SAS, a través de la cual el Tendero accede, utiliza y gestiona el crédito,
        realiza compras con el monto disponible y consulta la información relacionada con
        el Crédito. Constituye el canal exclusivo para la originación del crédito.
      </p>

      <p>
        <strong>1.2 Crédito:</strong> Es el préstamo de dinero realizado por el Banco al
        Tendero bajo la modalidad de microcrédito.
      </p>

      <p>
        <strong>1.3 Distribuidor:</strong> es Surtialimentos, quien actúa como intermediario
        entre los fabricantes de los Productos y los Tenderos, encargado de la
        comercialización y entrega de dichos Productos y quien recibirá el pago de estos
        con el monto del Microcrédito que le sea otorgado al Tendero.
      </p>

      <p>
        <strong>1.4 Enlace:</strong> es myAllSupport SAS proveedor tecnológico encargado de la
        App Enlace Fiado, operación de la plataforma, validación de identidad mediante
        proveedores externos, scoring alternativo y comunicación de cupos al Banco.
      </p>

      <p>
        <strong>1.5 Fabricante:</strong> es Alpina Productos Alimenticios S.A.S. BIC
        encargado de ofrecer sus Productos dentro de la App Enlace Fiado. No participa en
        decisiones crediticias ni en el manejo del microcrédito otorgado por el Banco.
      </p>

      <p>
        <strong>1.6 Microcrédito:</strong> es una línea de crédito destinada a financiar
        actividades productivas y/o comerciales de pequeñas empresas o unidades
        productivas a pequeña escala.
      </p>

      <p>
        <strong>1.7 Piloto:</strong> es la prueba inicial del Proyecto (Fase I) definido en
        un entorno controlado y limitado para evaluar su viabilidad antes de la
        masificación.
      </p>

      <p>
        <strong>1.8 Proyecto:</strong> conjunto de actividades orientadas a desarrollar una
        solución financiera a través de Créditos bajo la modalidad de microcrédito, a
        Tenderos que cumplan con las condiciones establecidas por el BANCO W. Dicha
        solución busca permitir la adquisición de Créditos por parte de los Tenderos, que
        tengan una necesidad de financiamiento para adquirirlos de parte de los
        Distribuidores.
      </p>

      <p>
        <strong>1.9 Tendero:</strong> persona que administra o es propietaria de una tienda,
        o negocio pequeño, generalmente de barrio, donde se venden Productos de uso básico
        y cotidiano.
      </p>

      <h3>2. Objeto</h3>

      <p>
        Regular las condiciones bajo las cuales el Banco pone a disposición del Tendero un
        Microcrédito con destinación exclusiva para el abastecimiento de los Productos del
        Fabricante a través de la App Enlace Fiado, incluyendo los derechos y obligaciones
        de cada parte, así como el alcance de las actividades de los actores.
      </p>

      <h3>3. Condiciones del Crédito</h3>

      <h3>3.1 Características financieras</h3>

      <p>
        El Crédito otorgado corresponde a un microcrédito, cuyo monto será determinado por el Banco 
        dentro de los límites establecidos para este tipo de Crédito. El Crédito tendrá un valor mínimo 
        de doscientos mil pesos colombianos ($200.000) y un valor máximo de un millón de pesos colombianos 
        ($1.000.000) a un plazo de pago de quince (15) días calendario por cada utilización, contados desde la 
        fecha de compra al Distribuidor. 
      </p>

      <p>
        El crédito se encuentra sujeto a una tasa de interés que puede ser consultada a
        través de la página web oficial <a href="https://www.bancow.com.co" target="_blank">www.bancow.com.co</a> o en las carteleras dispuestas en
        las Oficinas del Banco.
      </p>

      <h3>3.2 Operación digital</h3>

      <p>
        El acceso y funcionamiento del Crédito se realiza exclusivamente a través de la App 
        Enlace Fiado. Todas las solicitudes, 
        transacciones, aceptaciones, autorizaciones y consultas relacionadas con el Crédito 
        eberán efectuarse dentro de esta plataforma, la cual constituye el canal único para el uso
         del crédito. Las actuaciones realizadas por el Tendero dentro de la App Enlace Fiado se 
         entienden emitidas por él y tienen plenos efectos jurídicos conforme a la Ley 527 de 1999 y 
         demás normas aplicables a los mensajes de datos y a la firma electrónica
      </p>

      <p>
        Toda transacción, confirmación o instrucción emitida desde el perfil del Tendero se considerará válidamente 
        ealizada por él, salvo prueba en contrario. 
      </p>

      <h3>3.3 Funcionamiento del Crédito</h3>

    <p>
        El Crédito opera mediante un esquema digital integrado que
        articula al Banco, Enlace, Distribuidor, Fabricante y el Tendero. 
        El mecanismo de funcionamiento del Crédito es el siguiente:
    </p>
      <ul class="lista-disc">
        <li>
          El Tendero podrá registrarse en la App Enlace Fiado, validar su identidad,
          realizar la solicitud de Crédito y firmar de manera digital los documentos del
          Banco que se generen de dicha solicitud.
        </li>
        <li>
          A través de la App Enlace Fiado el Tendero realizará el diligenciamiento de los
          formatos del Banco con el fin de consignar la información que permitirá realizar
          el estudio de crédito para el otorgamiento del Crédito.
        </li>
        <li>
          Banco recogerá la información de los Tenderos y realizará todas las gestiones
          administrativas requeridas para el otorgamiento del Crédito.
        </li>
        <li>
          Una vez el Banco estudia la documentación, genera una calificación por Tendero,
          la cual define el monto del Crédito que tendrá habilitado.
        </li>
        <li>
          El Tendero podrá hacer uso del Crédito otorgado únicamente por medio de la App
          Enlace Fiado.
        </li>
        <li>
          El Tendero podrá acceder a un Crédito y efectuar con éste el pago al Distribuidor
          de los productos para abastecer sus negocios.
        </li>
        <li>
          El pago al Distribuidor se realizará directamente por el Banco.
        </li>
      </ul>

      <h3>3.4 Renovación del Crédito</h3>

      <p>
        El Crédito se renovará únicamente cuando el Banco registre en sus 
        sistemas el pago total del saldo vigente, lo cual constituye la terminación de
         la obligación correspondiente al ciclo anterior. De igual forma, la renovación
          procederá únicamente cuando Enlace reciba la confirmación del pago por parte del 
          Banco y procese la actualización del nuevo saldo disponible habilitando al Tendero para efectuar 
        nuevas disposiciones del Crédito dentro de App Enlace Fiado
      </p>

      <h3>4. Proceso de vinculación y aprobación</h3>

      <p>
        El Tendero autoriza al Banco y Enlace para realizar los procesos de validación de identidad necesarios para el acceso y uso del Crédito, los cuales podrán incluir mecanismos biométricos, documentales o verificaciones efectuadas a través de proveedores tecnológicos especializados. 
      </p>

      <p>
        En caso de presentarse inconsistencias, indicios de fraude, riesgo operativo o incumplimiento de requisitos normativos, el Banco y Enlace podrán abstenerse de continuar con el proceso de vinculación. 
      </p>

      <p>
        Para la determinación del monto del crédito aplicable a cada Tendero, el Banco realizará la evaluación crediticia correspondiente de acuerdo con sus políticas de riesgo de crédito. Con base en dicha evaluación, el Banco podrá aprobar, modificar o negar el Crédito solicitado. 
      </p>

      <h3>5. Uso del crédito</h3>

      <h3>5.1 Validación de transacciones</h3>

      <p>
        Toda compra realizada por el Tendero dentro de la App Enlace Fiado se entiende válidamente autorizada, por cuanto es aceptada voluntariamente y 
        verificada mediante los mecanismos de autenticación digital disponibles.
      </p>

      <h3>5.2 Flujo financiero</h3>

      <p>
        El Banco realizará el desembolso del crédito directamente al Distribuidor, operación que el Tendero reconoce como entrega válida del Crédito. El Banco no será responsable por la calidad, idoneidad, entrega o garantía de los productos adquiridos al Distribuidor, por tratarse de una relación comercial independiente. 
      </p>

      <h3>6. Pagos</h3>

      <p>
        El pago de las obligaciones derivadas del Crédito deberá realizarse exclusivamente a través de los canales autorizados por el Banco, a saber: PSE, corresponsales bancarios y oficinas del Banco. Los pagos efectuados por el Tendero se aplicarán siguiendo el orden legal y contractual correspondiente, esto es, primero a intereses de mora, luego a intereses corrientes y finalmente a capital.
      </p>

      <p>
        El Banco no será responsable por pagos realizados al Crédito en canales no autorizados, caso en el cual el pago se entenderá como no efectuado
      </p>
      <h3>7. Mora en el Pago</h3>

      <p>
       El Tendero incurrirá en incumplimiento si no paga la obligación dentro del plazo establecido para cada ciclo (15 días). En tal caso, a partir del día dieciséis (16), la App Enlace Fiado bloqueará automáticamente el Crédito, impidiendo nuevas disposiciones. El Banco se encuentra facultado para iniciar la gestión de cobranza  conforme a sus políticas desde el primer día de mora.
      </p>

      <h3>8. Limitación de responsabilidad</h3>

      <p>
        El Banco no será responsable por fallas de la App Enlace Fiado o de los proveedores tecnológicos que la soportan, por retrasos en notificaciones o en la sincronización de datos, ni por errores, incumplimientos o fallas atribuibles al Distribuidor o Fabricante. De igual manera, el Banco no asume responsabilidad por la calidad, entrega, idoneidad o garantía de los productos adquiridos por el Tendero, ni por interpretaciones, ofertas o manifestaciones comerciales realizadas por terceros dentro o fuera de la App Enlace Fiado. La responsabilidad del Banco se limita exclusivamente al otorgamiento del Crédito y el manejo financiero del mismo, sin que ello implique garantía, aval o validación sobre las transacciones comerciales entre el Tendero y el Distribuidor
      </p>

      <p>
        
        El Distribuidor y Fabricante no cuentan con facultad alguna para intermediar operaciones financieras, modificar el monto, condiciones o reglamentos del Crédito, otorgar garantías a nombre del Banco o comprometerlo de cualquier forma. Cualquier manifestación, promesa o instrucción emitida por estos terceros que contradiga lo dispuesto en estos Términos y Condiciones carece de validez contractual y no generará obligación alguna para el Banco
      </p>


      <h3>9. Obligaciones del Tendero</h3>

      <ol class="lista-number">
        <li>Suministrar información veraz, completa y verificable durante el proceso de vinculación y en la operación del Crédito.</li>
        <li>Mantener actualizados sus datos de contacto, incluyendo teléfono, dirección y correo electrónico</li>
        <li>Pagar oportunamente las obligaciones derivadas del Crédito dentro de los plazos establecidos para cada ciclo.</li>
        <li>Utilizar la App Enlace Fiado de manera segura, personal e intransferible, garantizando la custodia de sus credenciales y evitando accesos de terceros.</li>
        <li>Abstenerse de permitir que terceros utilicen su cuenta, realicen operaciones o dispongan del monto del Crédito en su nombre.</li>
        <li>No usar el Crédito para fines ilícitos, prohibidos o no autorizados, y cumplir todas las disposiciones legales aplicables.</li>
      </ol>

      <p>El incumplimiento de cualquiera de estas obligaciones faculta al Banco para adoptar las medidas previstas en estos Términos y Condiciones.</p>

      <h3>10. Prohibiciones</h3>

      <p>El tendero no podrá:</p>
      <ol class="lista-number">
        <li>Comercializar, ceder, transferir o prestar el Crédito, total o parcialmente.</li>
        <li>Comercializar, ceder, transferir o prestar el Crédito, total o parcialmente.</li>
        <li>Exigir desembolsos directos o pagos a su favor, por cuanto el Crédito se desembolsa únicamente al Distribuidor.</li>
        <li>Desconocer las compras realizadas al Distribuidor desde su cuenta en la App Enlace Fiado.</li>
      </ol>

      <p>Cualquier actuación enunciada en este numeral constituye incumplimiento y faculta al Banco para aplicar las medidas previstas en estos Términos y Condiciones.</p>

      <h3>11. Tratamiento de datos</h3>

      <p>
        El Banco y myAllSupport SAS utilizarán los datos personales del Tendero para los fines relacionados con el otorgamiento del Crédito a través de la App Enlace Fiado, conforme a las Políticas de Tratamiento de Datos de cada uno, disponibles en la página web <a href="www.bancow.com.co">www.bancow.com.co</a> y <a href="www.enlace-crm.com">www.enlace-crm.com</a>. 
      </p>

      <h3>12. Modificaciones contractuales</h3>

      <p>
        El Banco se reserva el derecho de modificar, limitar, suprimir o adicionar los términos y condiciones en cualquier tiempo, lo anterior se informará a los clientes por cualquier medio que se considere eficaz para tal fin de conformidad con la norma.
      </p>

    </section>

    <Footer />
  </motion.div>
</template>

<style scoped>


.lista-disc{
    list-style-type: disc;
    padding-left: 20px;
}

.lista-number{
    list-style-type: decimal;
    padding-left: 20px;
}

ul{
    padding-left: 20px;
}

.terminos-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
  line-height: 1.9;
}

h3 {
  margin-top: 32px;
  font-weight: bold;
}

h4 {
  margin-top: 20px;
  font-weight: 600;
}

p{
    margin-bottom: 30px;
}

p,
li {
  font-size: 1rem;
  color: #111;
  margin: 20px;
}
</style>

