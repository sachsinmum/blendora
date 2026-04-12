package com.blendora.backend.controller;

import com.blendora.backend.service.MediaService;
import com.blendora.backend.service.OrderService;
import com.blendora.backend.model.Order;
import com.blendora.backend.model.OrderStatus;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Path;

@RestController
@RequestMapping("/api/media")
public class MediaController {

    private final MediaService mediaService;
    private final OrderService orderService;

    public MediaController(MediaService mediaService, OrderService orderService) {
        this.mediaService = mediaService;
        this.orderService = orderService;
    }

    @PostMapping("/upload/{orderId}")
    public ResponseEntity<Order> uploadVideo(@PathVariable Long orderId, @RequestParam("file") MultipartFile file) {
        String fileName = mediaService.storeFile(file);
        String fileUrl = "/api/media/view/" + fileName;
        
        Order order = orderService.getOrder(orderId);
        order.setVideoUrl(fileUrl);
        // Also advance status to READY_FOR_DELIVERY once video is uploaded
        return ResponseEntity.ok(orderService.updateStatus(orderId, OrderStatus.READY_FOR_DELIVERY));
    }

    @PostMapping("/upload-photo/{orderId}")
    public ResponseEntity<Order> uploadPhoto(@PathVariable Long orderId, 
                                            @RequestParam("file") MultipartFile file,
                                            @RequestParam("type") String type) {
        String fileName = mediaService.storeFile(file);
        String fileUrl = "/api/media/view/" + fileName;
        
        Order order = orderService.getOrder(orderId);
        // Simplified JSON storage for images
        String currentImages = order.getImageDetailsJson() != null ? order.getImageDetailsJson() : "{}";
        String updatedImages = currentImages.replace("}", "\"" + type + "\":\"" + fileUrl + "\"}");
        order.setImageDetailsJson(updatedImages);
        
        return ResponseEntity.ok(orderService.getOrder(orderId));
    }

    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFile(@PathVariable String fileName) {
        try {
            Path path = mediaService.loadFile(fileName);
            Resource resource = new UrlResource(path.toUri());
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType("video/mp4")) // Assuming mp4 for demo
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
