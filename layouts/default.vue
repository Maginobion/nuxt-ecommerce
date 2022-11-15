<template>
    <div>
        <LayoutHeader/>
        <main>
            <slot/>
        </main>     
        <LayoutFooter/>
    </div>   
</template>

<style scoped>
main{
    display: flex;
    justify-content: center;
}
</style>