<template>
  <div>
    <div class="flex justify-between items-center">
      <div class="flex justify-start items-center">
        <y-button @click="() => router.back()" variant="outline" size="xs">
          <ChevronLeft />
        </y-button>
        <h1 class="font-medium ml-4">Inventory Controller</h1>
      </div>
      <div>
        <y-button size="sm" @click="SaveInventory"> Save Inventory </y-button>
      </div>
    </div>
    <div class="w-full">
      <page-wrapper>
        <CardHeader class="px-0">
          <CardTitle>Inventory Details</CardTitle>
          <CardDescription
            >Enter Inventory name and description.</CardDescription
          >
        </CardHeader>
        <div class="grid w-full items-center gap-1.5">
          <Label for="title">Inventory name</Label>
          <Input id="title" type="text" v-model="inventory.title" />
        </div>
        <div class="grid w-full gap-1.5 mt-4">
          <Label for="description">Inventory description</Label>
          <Textarea
            id="description"
            placeholder="Inventory description"
            v-model="inventory.description"
          />
        </div>
        <div class="grid w-full gap-1.5 mt-4">
          <Label for="description">In Date</Label>
          <y-calendar
            id="in_date"
            placeholder="In Date"
            :value="inventory.inDate"
            v-model="inventory.inDate"
            @update:value="(e: string) => inventory.inDate = e"
          />
        </div>
      </page-wrapper>
      <page-wrapper class="mt-6">
        <CardHeader class="px-0">
          <CardTitle>Stock</CardTitle>
          <CardDescription>Enter Inventory price and size.</CardDescription>
        </CardHeader>
        <div class="flex flex-wrap items-center gap-8">
          <div class="flex flex-col w-full md:w-[30%] items-start gap-1.5">
            <y-select
              label="Product"
              v-model="inventory.productId"
              :data="productsSelectList"
            />
          </div>
          <div
            class="flex flex-col w-full md:w-[30%] items-start gap-1.5 md:mt-0 mt-4"
          >
            <Label for="quantitiy">Quantitiy</Label>
            <Input id="quantitiy" type="number" v-model="inventory.quantitiy" />
          </div>
          <div
            class="flex flex-col w-full md:w-[30%] items-start gap-1.5 md:mt-0 mt-4"
          >
            <Label for="pricePerProduct">Price Per Product</Label>
            <Input
              id="pricePerProduct"
              type="number"
              v-model="inventory.pricePerProduct"
            />
          </div>
        </div>
      </page-wrapper>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue functions
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
// Icons and Types
import { ChevronLeft } from "lucide-vue-next";
import { IInventory, ISelect } from "@/modules/basics";
import { AxiosError, AxiosResponse } from "axios";
// Components
import { Input } from "@/components/ui/input";
import Label from "@/components/ui/label/Label.vue";
import Textarea from "@/components/ui/textarea/Textarea.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import { ProductService } from "@/views/Products/products.service";
import { InventoryInService } from "@/views/InventoryIn/inventoryin.service";
import { useToast } from "@/components/ui/toast/use-toast";

const { toast } = useToast();
const router = useRouter();
const route = useRoute();
const inventory = ref<IInventory>({
  description: "",
  id: null,
  inDate: "",
  product: "",
  pricePerProduct: null,
  productId: null,
  quantitiy: null,
  status: "",
  statusId: null,
  title: "",
});

const productsSelectList = ref<ISelect[]>([]);
function GetProductsAsSelectList() {
  ProductService.GetAsSelectList().then((res: AxiosResponse) => {
    productsSelectList.value = res.data.rows;
  });
}
GetProductsAsSelectList();

// Save Inventory Function
function SaveInventory() {
  if (inventory.value && inventory.value.title && inventory.value.description) {
    InventoryInService.Update(inventory.value).then((res: AxiosResponse) => {
      toast({
        title: "Successfully Saved",
        variant: "default",
        duration: 1000,
      });
      router.push("/inventory-in/");
    });
  } else {
    toast({
      title: "Fill the requered fields",
      description: "Title, Description, Image",
      variant: "destructive",
    });
  }
}

InventoryInService.Get(+route.params.id)
  .then((res: AxiosResponse) => {
    inventory.value = res.data;
    if (+route.params.id == 0) {
      inventory.value.pricePerProduct = null;
      inventory.value.productId = null;
      inventory.value.quantitiy = null;
    }
  })
  .catch((e: AxiosError) => {
    toast({
      title: `Error GetRequest`,
      description: `${e}`,
      variant: "destructive",
    });
  });
</script>

<style scoped></style>
