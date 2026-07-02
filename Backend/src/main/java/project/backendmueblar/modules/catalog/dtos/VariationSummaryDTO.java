package project.backendmueblar.modules.catalog.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VariationSummaryDTO {
    private String name;
    private Double price;
    private String sku;
    private String thumbnail;
}
