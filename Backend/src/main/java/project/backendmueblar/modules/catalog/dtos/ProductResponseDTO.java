package project.backendmueblar.modules.catalog.dtos;

import lombok.Getter;
import lombok.Setter;
import project.backendmueblar.modules.catalog.entities.CategoryEntity;
import project.backendmueblar.modules.catalog.entities.VariationEntity;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class ProductResponseDTO {
    private List<CategoryResponseDTO> categories;
    private String description;
    private Map<String, Double> dimensions;
    private Boolean enable;
    private String model;
    private List<VariationResponseDTO> variations;
}
