package project.backendmueblar.modules.catalog.dtos;

import lombok.Getter;
import lombok.Setter;
import project.backendmueblar.modules.catalog.entities.AttributeEntity;
import project.backendmueblar.modules.catalog.entities.ThumbnailEntity;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class VariationResponseDTO {
    private String sku; //
    private String name; //
    private Map<String, Object> instance_params; //
    private String model_3d; //
    private Integer price; //
    private Boolean top; //
    private Boolean enabled; //
    private String thumbnail; //
    private List<String> imgs; //
    private List<AttributeSummaryDTO> atribs;
}
