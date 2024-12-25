<template>
    <div style="display: flex; flex-wrap: wrap; flex-direction: row-reverse;">
      <!-- Render smiles in a single line -->
      <div v-if="data.smiles" class="smiles-item">
        <p>{{ data.smiles }}</p>
      </div>
  
      <!-- Recursively render children -->
      <div v-if="data.children && data.children.length > 0" class="children-container">
        <div v-for="(child, index) in data.children" :key="index" class="child-container">
          <!-- Recursive component call for each child -->
          <SmilesDisplay :data="child" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SmilesDisplay',
    props: {
      data: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .smiles-item {
    display: inline-block;
    margin-left: 20px; /* Space between elements */
  }
  
  .children-container {
    display: flex;
    flex-direction: column;  /* This makes the children appear vertically */
    margin-right: 20px; /* Add spacing between smiles and children */
  }
  
  .child-container {
    display: inline-block;
    margin-bottom: 10px;  /* Space between child containers */
  }
  </style>
  