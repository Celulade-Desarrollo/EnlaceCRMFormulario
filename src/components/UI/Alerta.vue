<template>
    <div class="alerta">
        <slot></slot>
    </div>
</template>

<style>
    .alerta{
        padding: 1rem;
        font-weight: 900;
        text-transform: uppercase;
        font-size: 1rem;
        text-align: start;
        margin-top: -50px;
        background-color: var(--blanco);
    
        color: #B91C1C;
        margin-bottom: 2rem;
        padding: 40px;
    }
</style>