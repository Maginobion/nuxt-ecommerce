<template>
    <div class="bg">
        <article>
            <header>
                <img src="~/assets/images/alerta.png" width="80"/>
                <h1>Estado peligroso de varios indicadores</h1>
            </header>
            <div class="content">             
                <p>
                    Se ha presentado un cambio alarmante
                    en los niveles de TVOC en la sede 
                    <span class="blue">San Martín.</span>
                </p>
                <p class="criticContainer">
                    <span class="critic">Indicadores en alerta:</span>
                    <span>CO2, PM2.5, PM10, TVOC, HCHO</span>
                </p>
                <p>
                    <img src="~/assets/images/estado.png" width="16px"/>
                    <strong>Estado:</strong>
                    <span class="status">Peligroso</span>
                </p>
                <p>
                    <img src="~/assets/images/ambiente.png" width="16px"/>
                    <strong>Ambiente:</strong>
                    <span>Sala de Espera Pacientes Inyectados</span>
                </p>
                <p>
                    <img src="~/assets/images/calendario.png" width="16px"/>
                    <strong>Fecha:</strong>
                    <span>11/11/2022</span>
                </p>
                <p>
                    <img src="~/assets/images/reloj.png" width="16px"/>
                    <strong>Hora:</strong>
                    <span>21: 47: 20</span>
                </p>
            </div>
            <footer>
                <button>Revisar la alerta ahora</button>
            </footer>
        </article>
    </div>
</template>

<style scoped> 
.bg{
    font-family: Arial, Helvetica, sans-serif;
    width: 100%;
    background-color: whitesmoke;
    overflow: hidden;
    color: gray;
    --lateral-padding: 8%;
    --radius: 20px;
    --critic-color: #f0142f;
    --color-primary: #1139FA;
}
h1{
    font-weight: lighter;
    font-size: 1.4em;
    margin: 1% 0;
}
header{
    background-color: #57B8FF;
    padding: 4% var(--lateral-padding) 2% var(--lateral-padding);
    text-align: center;
    color: white;
    border-top-left-radius: var(--radius);
    border-top-right-radius: var(--radius);
}
.blue{
    color: var(--color-primary);
    margin-left: 4px;
}
article{
    padding: 4% 8%;
}
.content{
    padding: 20px var(--lateral-padding);
    background: white;
}
p{
    display: flex;
    align-items: center;
}
p img{
    margin-right: 1%;
}
p strong{
    color: var(--color-primary);
}
.criticContainer{
    margin: 4% 0;
}
.critic{
    color: white;
    margin-right: 8px;
    background-color: var(--critic-color);
    padding: 4px 6px;
    border-radius: 4px;
}
.status{
    color: var(--critic-color);
}
i{
    margin-right: 14px;
}
strong{
    color: black;
    margin-right: 4px;
}
footer{
    background: white;
    border-top: 1px solid #0000003a;
    text-align: center;
    padding: 20px var(--lateral-padding);
    border-bottom-left-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
}
button{
    font-size: 0.8em;
    background-color: var(--color-primary);
    border: 0;
    border-radius: 4px;
    padding: 10px 64px;
    color: white;
}
</style>