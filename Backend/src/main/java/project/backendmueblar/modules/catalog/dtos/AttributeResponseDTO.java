package project.backendmueblar.modules.catalog.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttributeResponseDTO {
    private String id;
    private String value;
    private VariationSummaryDTO variation;
    private AttribTypeSummaryDTO atribType;
}
