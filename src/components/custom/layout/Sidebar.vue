<script setup lang="ts">
// @ts-nocheck
import { ref, onMounted, onUnmounted, watch, inject } from "vue";
import { useRoute, RouterView } from "vue-router";
import { Bell, Package2, Search, Menu as MenuIcon } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Theme from "@/components/theme/theme.vue";
import Profile from "./components/profile.vue";

const route = useRoute();

const {
  sidebarOpen,
  mobileOpen,
  isHovering,
  isDesktop,
  routes,
  toggleSidebar,
  toggleChildren,
  isCurrentRoute,
  handleMouseEnter,
  handleMouseLeave,
  handleOutsideClick,
  updateIsDesktop,
} = inject<any>("layout");

onMounted(() => {
  window.addEventListener("resize", updateIsDesktop);
  // Load sidebar state from localStorage
  const savedState = localStorage.getItem("sidebarOpen");
  if (savedState !== null) {
    sidebarOpen.value = JSON.parse(savedState);
  } else {
    sidebarOpen.value = true; // Default to open on desktop
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", updateIsDesktop);
});

// Add event listener for outside clicks
onMounted(() => {
  window.addEventListener("click", handleOutsideClick);
});

onUnmounted(() => {
  window.removeEventListener("click", handleOutsideClick);
});
</script>

<template>
  <div class="flex w-full overflow-hidden">
    <aside
      id="sidebar"
      :class="[
        'fixed inset-y-0 left-0 left-sidebar z-50 flex flex-col transition-all duration-300 ease-in-out ',
        isDesktop
          ? (isHovering && !sidebarOpen) || sidebarOpen
            ? 'w-64'
            : 'w-16'
          : mobileOpen
          ? 'w-64'
          : 'w-0',
        'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        isDesktop && !sidebarOpen ? 'hover:absolute hover:w-64' : '',
      ]"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div class="flex h-full flex-col border-r">
        <!-- Sidebar Header -->
        <div class="flex h-14 items-center border-b px-4">
          <router-link to="/" class="flex items-center gap-2 font-semibold">
            <Package2 class="h-6 w-6" />
            <span v-show="isHovering || sidebarOpen || mobileOpen">Yunin</span>
          </router-link>
          <Button
            v-show="isHovering || sidebarOpen || mobileOpen"
            variant="outline"
            size="icon"
            class="ml-auto h-8 w-8"
          >
            <Bell class="h-4 w-4" />
            <span class="sr-only">Toggle notifications</span>
          </Button>
        </div>

        <!-- Sidebar Navigation -->
        <nav
          class="flex-1 overflow-auto p-2 scrollbar-thin scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/25"
        >
          <ul class="space-y-1">
            <li v-for="item in routes" :key="item.name">
              <router-link
                :to="item.to"
                @click.prevent="toggleChildren(item.name)"
                :class="[
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted/50',
                  isCurrentRoute(item.to)
                    ? 'bg-muted text-primary'
                    : 'text-muted-foreground',
                ]"
              >
                <component :is="item.icon" class="h-4 w-4" />
                <span
                  :class="[
                    'transition-opacity duration-300',
                    !isDesktop || isHovering || sidebarOpen || mobileOpen
                      ? 'opacity-100'
                      : 'opacity-0 hidden',
                  ]"
                  >{{ item.name }}</span
                >
              </router-link>

              <!-- Sub-menu items -->
              <ul
                v-if="
                  item.childrenVisible &&
                  item.children &&
                  item.children.length > 0
                "
                class="mt-1 ml-4 space-y-1"
              >
                <li v-for="child in item.children" :key="child.name">
                  <router-link
                    :to="child.to"
                    :class="[
                      'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted/50',
                      isCurrentRoute(child.to)
                        ? 'bg-muted text-primary'
                        : 'text-muted-foreground',
                    ]"
                  >
                    <component :is="child.icon" class="h-4 w-4" />
                    <span
                      :class="[
                        'transition-opacity duration-300',
                        !isDesktop || isHovering || sidebarOpen || mobileOpen
                          ? 'opacity-100'
                          : 'opacity-0 hidden',
                      ]"
                      >{{ child.name }}</span
                    >
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        <!-- Upgrade Card -->
        <div v-show="isHovering || sidebarOpen || mobileOpen" class="p-4">
          <Card>
            <CardHeader class="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent class="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" class="w-full">Upgrade</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
* {
  transition: all 0.6s ease-out;
}
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thumb-muted-foreground\/20 {
  scrollbar-color: rgba(var(--muted-foreground), 0.2) transparent;
}

.scrollbar-thumb-muted-foreground\/25:hover {
  scrollbar-color: rgba(var(--muted-foreground), 0.25) transparent;
}

.left-sidebar {
  box-shadow: -15px 1px 20px rgba(0, 0, 0, 0.9);
}
</style>
