<template>
  <page-wrapper>
    <div class="font-bold text-lg mt-4">Inventroy In</div>
    <list>
      <list-item label="Title" :value="data.title" />
      <list-item label="Description" :value="data.description" />
      <list-item label="Product" :value="data.product" />
      <list-item label="In Date" :value="data.inDate" />
      <list-item
        label="Price per product"
        :value="data.pricePerProduct"
        :isAmount="true"
      />
      <list-item label="Quantitiy" :value="data.quantitiy" />
      <list-item
        label="Status"
        :value="data.status"
        :statusId="data.statusId"
      />
    </list>
  </page-wrapper>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { InventoryInService } from "../inventoryin.service";
import { IInventory } from "@/modules/basics";

const route = useRoute();
const data = ref<IInventory>({
  description: "",
  id: 0,
  inDate: "",
  pricePerProduct: 0,
  product: "",
  productId: 0,
  quantitiy: 0,
  status: "",
  statusId: 0,
  title: "",
});

onMounted(async () => {
  try {
    const response = await InventoryInService.Get(+route.params.id);
    data.value = response.data;
  } catch (error) {
    console.error("Error fetching inventory data:", error);
  }
});
</script>

<style scoped>
.info-list {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 1rem;
  margin-top: 1rem;
}
</style>
