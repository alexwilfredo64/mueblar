package project.backendmueblar.modules.catalog.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.backendmueblar.modules.catalog.dtos.ProductResponseDTO;
import project.backendmueblar.modules.catalog.entities.CategoryEntity;
import project.backendmueblar.modules.catalog.entities.VariationEntity;
import project.backendmueblar.modules.catalog.services.CatalogService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class RestControllerCatalog {

    private final CatalogService catalogService;

    @GetMapping(value = "/{model}", consumes = "application/json")
    public ResponseEntity<?> getSpecificProduct(@PathVariable("model") String modelOfProduct, @RequestParam(required = false) boolean simpleVariation) {
        ProductResponseDTO specificProduct = catalogService.getSpecificProduct(modelOfProduct, simpleVariation);

    }
}
