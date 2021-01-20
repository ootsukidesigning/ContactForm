<template>
  <div class="header">
    <b-container>
      <b-row
        align-v="center"
        align-h="center"
        cols="1"
        cols-md="2"
        class="py-4"
      >
        <b-col cols="12" md="7" lg="8" class="mb-4 mb-md-0">
          <slot name="brand">
            <MoleculeHeaderCompanyName />
          </slot>
        </b-col>
        <b-col cols="11" sm="8" md="5" lg="4">
          <slot name="info">
            <MoleculeHeaderContactInfo />
          </slot>
        </b-col>
      </b-row>
    </b-container>
    <div class="bg-light">
      <b-container>
        <b-row>
          <b-col>
            <slot name="nav">
              <MoleculeHeaderNav />
            </slot>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<style scoped></style>
